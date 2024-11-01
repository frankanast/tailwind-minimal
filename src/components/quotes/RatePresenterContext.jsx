import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useQuoteContext } from "./QuoteContext.jsx";
import groupRatesForPresentation from "../../utils/groupRatesForPresentation.js";
import cleanUpResponse from "../../utils/cleanUpResponse.js";
import { evaluate } from 'mathjs';

export const RatePresenterContext = createContext(undefined);

export function RatePresenterProvider({ children }) {
    const { loadedData, checkInDate, checkOutDate, totalPeople, occupancy, los } = useQuoteContext();
    const [parsedData, setParsedData] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [editedEntities, setEditedEntities] = useState([]);

    const allTabs = useRef([]);
    const [selectedTabId, setSelectedTabId] = useState(null);
    const [allItemsInCurrentOccupancy, setAllItemsInCurrentOccupancy] = useState([]);

    const [formulaDialogIsOpen, setFormulaDialogIsOpen] = useState(false);
    const [formulaInput, setFormulaInput] = useState('');

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
            "blastness_url": "...",
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

    function updateSelection(action) {
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

    function applyRateVariation(formula, additionalScope = {}) {
        parsedData.data.forEach(occupancy => {
            occupancy.rooms.forEach(room => {
                if (selectedItems.includes(room.entity_id)) {
                    room.rates.forEach(rate => {
                        let scope = {
                            rateAmount: rate.amount,
                            adultsCount: occupancy.adults,
                            childrenCount: occupancy.children,
                            guestCount: occupancy.adults + occupancy.children,
                            los: los,
                            ...additionalScope,
                        };

                        try {
                            rate.amount = safelyEvaluate(formula, scope, rate.amount);
                        } catch (error) {
                            console.error("Error evaluating expression:", error);
                        }
                    });
                    setEditedEntities((prevEdits) => [...prevEdits, room.entity_id]);
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

        // Clear selection after deletion
        setSelectedItems([]);
    }


    return (
        <RatePresenterContext.Provider value={{
            parsedData,
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
            formulaInput,
            setFormulaInput,
            applyFormula: () => applyRateVariation(formulaInput),
            applyNetRateWorld: () => applyRateVariation("(rateAmount / 1.1) - 10%"),
            applyNetRateItaly: () => applyRateVariation("((rateAmount / 1.1) - 10%) - 22%"),
            deleteSelectedEntities,
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
