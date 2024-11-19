import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useQuoteContext } from "./QuoteContext.jsx";
import groupRatesForPresentation from "../../utils/groupRatesForPresentation.js";
import cleanUpResponse from "../../utils/cleanUpResponse.js";
import { evaluate } from 'mathjs';

export const RatePresenterContext = createContext(undefined);

export function RatePresenterProvider({ children }) {
    const { loadedData, checkInDate, checkOutDate, totalPeople, occupancy, los } = useQuoteContext();
    const [parsedData, setParsedData] = useState({});

    const allTabs = useRef([]);
    const allRates = useRef([]);

    const [isOnStandardMode, setIsOnStandardMode] = useState(true)

    const [selectedItems, setSelectedItems] = useState([]);
    const [editedEntities, setEditedEntities] = useState([]);

    const [selectedTabId, setSelectedTabId] = useState(null);
    const [allItemsInCurrentOccupancy, setAllItemsInCurrentOccupancy] = useState([]);

    const [formulaDialogIsOpen, setFormulaDialogIsOpen] = useState(false);
    const [formatDialogIsOpen, setFormatDialogIsOpen] = useState(false);

    const [formulaInput, setFormulaInput] = useState('');
    const [hiddenRates, setHiddenRates] = useState([]);

    function createParsedData(loadedData) {
        const parsed = groupRatesForPresentation(cleanUpResponse(loadedData.data), loadedData.metadata);
        return {
            "created": Date.now(),
            "user_id": "unknown",
            "check-in": checkInDate,
            "check-out": checkOutDate,
            "los": los,
            "occupancy_detail": occupancy,
            "total_guests": totalPeople,
            "data": parsed,
        };
    }

    useEffect(() => {
        if (loadedData) {
            const newParsedData = createParsedData(loadedData);
            setParsedData(newParsedData);
            allTabs.current = newParsedData.data.map((i) => i.occ_id);

            if (newParsedData.data && newParsedData.data.length > 0) {
                setSelectedTabId(newParsedData.data[0].occ_id);
            }
        }
    }, [loadedData, checkInDate, checkOutDate, los, occupancy, totalPeople]);

    useEffect(() => {
        if (selectedTabId) {
            const currentOccupancy = parsedData.data.find((occ) => occ.occ_id === selectedTabId);
            if (currentOccupancy) {
                const items = currentOccupancy.rooms.map((room) => room.entity_id);
                setAllItemsInCurrentOccupancy(items);
            }
        }
    }, [selectedTabId, parsedData]);


    function updateSelection(action) {
        if (!parsedData || !parsedData.data || parsedData.data.length === 0) {
            return [];
        }

        setSelectedItems((prevSelectedItems) => {
            const allItems = parsedData.data.map(occ => occ.rooms.map(room => room.entity_id)).flat();
            const currentOccupancyItems = allItemsInCurrentOccupancy;
            let itemsToSelect = [], itemsToDeselect = [];

            switch (action) {
                case 'all':
                    return [...prevSelectedItems.filter((item) => !currentOccupancyItems.includes(item)), ...currentOccupancyItems];

                case 'none':
                    return prevSelectedItems.filter((item) => !currentOccupancyItems.includes(item));

                case 'inverse':
                    itemsToSelect = currentOccupancyItems.filter((item) => !selectedItems.includes(item));
                    itemsToDeselect = selectedItems.filter((item) => currentOccupancyItems.includes(item));
                    break;

                case 'everything':
                    return allItems;

                case 'nothing':
                    return [];

                case 'inverseEverything':
                    itemsToSelect = allItems.filter((item) => !selectedItems.includes(item));
                    itemsToDeselect = selectedItems.filter((item) => allItems.includes(item));
                    break;

                default:
                    return prevSelectedItems;
            }

            return [
                ...prevSelectedItems.filter((item) => !itemsToDeselect.includes(item)),
                ...itemsToSelect,
            ];
        });
    }

    // Update allRates
    useEffect(() => {
        if (parsedData && parsedData.data) {
            allRates.current = []

            const rates = []
            parsedData.data.forEach(item => {
                item.rooms.forEach(room => {
                    room.rates.forEach(rate => {
                        rates.push({
                            id: rate.id,
                            name: rate.data.name,
                            is_package: rate.data.is_package
                        });
                    });
                });
            });

            allRates.current = rates.filter((rate, index, self) =>
                index === self.findIndex((r) => r.id === rate.id)
            );
        }
    }, [parsedData]);

    function safelyEvaluate(expression, scope, fallbackValue) {
        if (!expression || expression.trim() === '') {
            return evaluate(`rateAmount * 1`, scope || { rateAmount: fallbackValue });
        }

        try {
            return evaluate(expression, scope || { rateAmount: fallbackValue });
        } catch (error) {
            console.error("Error evaluating expression:", error);
            return fallbackValue;
        }
    }

    function applyRateVariation(formula, additionalScope = {}, target = undefined, newName = undefined) {
        const updatedData = parsedData.data.map(occupancy => {
            return {
                ...occupancy,
                rooms: occupancy.rooms.map(room => {
                    if (selectedItems.includes(room.entity_id)) {
                        const updatedRates = room.rates.map(rate => {
                            if (target && target.includes(rate.id)) {
                                const scope = {
                                    rateAmount: rate.amount,
                                    adultsCount: occupancy.adults,
                                    childrenCount: occupancy.children,
                                    guestCount: occupancy.adults + occupancy.children,
                                    los: los,
                                    ...additionalScope,
                                };

                                return {
                                    ...rate,
                                    amount: safelyEvaluate(formula, scope, rate.amount),
                                    data: {
                                        ...rate.data,
                                        name: newName || rate.data.name,
                                        public_name: {
                                            ...rate.data.public_name,
                                            en: newName || rate.data.public_name?.en,
                                        },
                                    },
                                };
                            }
                            return rate;
                        });

                        return {
                            ...room,
                            rates: updatedRates,
                        };
                    }
                    return room;
                }),
            };
        });

        setParsedData({
            ...parsedData,
            data: updatedData,
        });
    }

    function deleteRates() {
        parsedData.data.forEach(occupancy => {
            occupancy.rooms.forEach(room => {
                if (selectedItems.includes(room.entity_id)) {
                    room.rates = room.rates.filter(rate => {
                        return !hiddenRates.includes(rate.id);
                    });

                    setEditedEntities(prevEdits => [...prevEdits, room.entity_id]);
                }
            });
        });
    }

    function restore() {
        const newParsedData = createParsedData(loadedData);
        setParsedData(newParsedData);
        allTabs.current = newParsedData.data.map((i) => i.occ_id);
    }

    function deleteSelectedEntities() {
        const updatedData = parsedData.data.map(occupancy => {
            const updatedRooms = occupancy.rooms.filter(room => !selectedItems.includes(room.entity_id));
            return {
                ...occupancy,
                rooms: updatedRooms
            };
        });

        setParsedData({
            ...parsedData,
            data: updatedData,
        });

        setSelectedItems([]);
    }


    return (
        <RatePresenterContext.Provider value={{
            parsedData,
            isOnStandardMode,
            setIsOnStandardMode,
            allRates,
            hiddenRates,
            setHiddenRates,
            selectedItems,
            setSelectedItems,
            editedEntities,
            setEditedEntities,
            selectedTabId,
            setSelectedTabId,
            allItemsInCurrentOccupancy,
            updateSelection,
            formulaDialogIsOpen,
            setFormulaDialogIsOpen,
            formatDialogIsOpen,
            setFormatDialogIsOpen,
            formulaInput,
            setFormulaInput,
            applyRateVariation,
            applyNetRateWorld: () => applyRateVariation("(rateAmount / 1.1) - 10%"),
            applyNetRateItaly: () => applyRateVariation("((rateAmount / 1.1) - 10%) - 22%"),
            deleteSelectedEntities,
            deleteRates,
            restore,
        }}>
            {children}
        </RatePresenterContext.Provider>
    );
}

export function useRatePresenterContext() {
    const context = useContext(RatePresenterContext);
    if (context === undefined) {
        throw new Error('useRatePresenterContext must be used within a RatePresenterProvider');
    }
    return context;
}
