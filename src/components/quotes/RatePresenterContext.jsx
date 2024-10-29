import {createContext, useContext, useEffect, useRef, useState} from "react";
import {useQuoteContext} from "./QuoteContext.jsx";
import groupRatesForPresentation from "../../utils/groupRatesForPresentation.js";
import cleanUpResponse from "../../utils/cleanUpResponse.js";
import {evaluate} from 'mathjs';

export const RatePresenterContext = createContext(undefined);

export function RatePresenterProvider({ children }) {
    const { loadedData } = useQuoteContext();
    const [parsedData, setParsedData] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);

    const allTabs = useRef([]);
    const [selectedTabId, setSelectedTabId] = useState(null);
    const [allItemsInCurrentOccupancy, setAllItemsInCurrentOccupancy] = useState([]);

    const [formulaDialogIsOpen, setFormulaDialogIsOpen] = useState(false)
    const [formulaInput, setFormulaInput] = useState('')

    useEffect(() => {
        if (loadedData) {
            const parsed = groupRatesForPresentation(cleanUpResponse(loadedData.data), loadedData.metadata);
            setParsedData(parsed);

            allTabs.current = parsed.map((i) => i.occ_id);

            // First occupancy is selected automatically
            if (parsed && parsed.length > 0) {
                setSelectedTabId(parsed[0].occ_id);
            }
        }
    }, [loadedData]);

    useEffect(() => {
        if (selectedTabId) {
            const currentOccupancy = parsedData.find((occ) => occ.occ_id === selectedTabId);
            if (currentOccupancy) {
                const items = currentOccupancy.rooms.map((room) => room.entity_id);
                setAllItemsInCurrentOccupancy(items);
            }
        }
    }, [selectedTabId, parsedData]);

    // If the user enters an empty formula et similia, mathjs considers it as a "set to 0/null".
    // Although this is technically correct, and makes sense to a programmer's mindset, it is misleading for the user
    // and also very risky since we are dealing with money here. For this reason, when user inputs nothing,
    // we will just multiply by 1 (therefore, no variation)
    function safelyEvaluate(expression, scope, fallbackValue) {
        if (!expression || expression.trim() === '') {
            return evaluate(`rateAmount * 1`, scope || {rateAmount: fallbackValue});
        }

        try {
            return evaluate(expression, scope || {rateAmount: fallbackValue});
        } catch (error) {
            console.error("Error evaluating expression:", error);
            return 0
        }
    }

    // SECTION 1a: Selection actions within current occupancy
    function selectAll() {
        setSelectedItems((prevSelectedItems) => [
            ...prevSelectedItems.filter((item) => !allItemsInCurrentOccupancy.includes(item)),
            ...allItemsInCurrentOccupancy
        ]);
    }

    function clearSelection() {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((item) => !allItemsInCurrentOccupancy.includes(item))
        );
    }

    function selectInverse() {
        const itemsToSelect = allItemsInCurrentOccupancy.filter(
            (item) => !selectedItems.includes(item)
        );

        const itemsToDeselect = selectedItems.filter(
            (item) => allItemsInCurrentOccupancy.includes(item)
        );

        setSelectedItems((prevSelectedItems) =>
            [
                ...prevSelectedItems.filter((item) => !itemsToDeselect.includes(item)),
                ...itemsToSelect,
            ]
        );
    }

    // SECTION 1b: Selection across occupancies ('everything')
    function selectEverything() {
        setSelectedItems(
            parsedData.map(occ => occ.rooms.map(room => room.entity_id)).flat()
        )
    }

    function selectNothing() {
        setSelectedItems([])
    }

    function selectInverseEverything() {
        const allItems = parsedData.map(occ => occ.rooms.map(room => room.entity_id)).flat()

        const itemsToSelect = allItems.filter(
            (item) => !selectedItems.includes(item)
        );

        const itemsToDeselect = selectedItems.filter(
            (item) => allItems.includes(item)
        );

        setSelectedItems((prevSelectedItems) =>
            [
                ...prevSelectedItems.filter((item) => !itemsToDeselect.includes(item)),
                ...itemsToSelect,
            ]
        );
    }

    //SECTION 2: Formulas
    function applyFormula() {
        parsedData.forEach(occupancy => {
            occupancy.rooms.forEach(room => {
                if (selectedItems.includes(room.entity_id)) {
                    room.rates.forEach(rate => {
                        let scope = {
                            rateAmount: rate.amount,
                            adultsCount: occupancy.adults,
                            childrenCount: occupancy.children,
                            guestCount: occupancy.adults + occupancy.children,
                        }

                        try {
                            //TODO: We should notify the UI about any modifications made, this included, and reflect that visually.
                            rate.amount = safelyEvaluate(formulaInput, scope, rate.amount);

                        } catch (error) {
                            console.error("Error evaluating expression:", error);

                        }

                    });
                }
            });
        });
    }

    return (
        <RatePresenterContext.Provider value={{
            parsedData,
            selectedItems,
            setSelectedItems,
            selectedTabId,
            setSelectedTabId,
            allItemsInCurrentOccupancy,
            selectAll,
            clearSelection,
            selectInverse,
            selectEverything,
            selectNothing,
            selectInverseEverything,
            formulaDialogIsOpen,
            setFormulaDialogIsOpen,
            formulaInput,
            setFormulaInput,
            applyFormula,
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
