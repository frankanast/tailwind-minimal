import {createContext, useContext, useEffect, useRef, useState} from "react";
import {useQuoteContext} from "./QuoteContext.jsx";
import groupRatesForPresentation from "../../utils/groupRatesForPresentation.js";
import cleanUpResponse from "../../utils/cleanUpResponse.js";
import { evaluate } from 'mathjs';

export const RatePresenterContext = createContext(undefined);

export function RatePresenterProvider({ children }) {
    const { loadedData } = useQuoteContext();
    const [parsedData, setParsedData] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedTabId, setSelectedTabId] = useState(null);

    const allTabs = useRef([]);
    const [allItemsInCurrentOccupancy, setAllItemsInCurrentOccupancy] = useState([]);

    const [formulaDialogIsOpen, setFormulaDialogIsOpen] = useState(false)
    const [formulaInput, setFormulaInput] = useState('')

    const [discountDialogIsOpen, setDiscountDialogIsOpen] = useState(false)
    const [discountInput, setDiscountInput] = useState('')

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

    // SECTION 1: Selection actions
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
                        // Use math.js evaluate to calculate the new rate amount
                        rate.amount = evaluate(formulaInput, scope);

                        //TODO: We should notify the UI about any modifications made, this included, and reflect that visually.
                    });
                }
            });
        });
    }

    function applyDiscount() {
        parsedData.forEach(occupancy => {
            occupancy.rooms.forEach(room => {
                if (selectedItems.includes(room.entity_id)) {
                    room.rates.forEach(rate => {
                        rate.amount = evaluate(`rateAmount - ${discountInput}%`, {rateAmount: rate.amount});
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
            formulaDialogIsOpen,
            setFormulaDialogIsOpen,
            formulaInput,
            setFormulaInput,

            discountDialogIsOpen,
            setDiscountDialogIsOpen,
            discountInput,
            setDiscountInput,

            applyFormula,
            applyDiscount,
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
