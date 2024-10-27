import {createContext, useContext, useEffect, useRef, useState} from "react";
import {useQuoteContext} from "./QuoteContext.jsx";
import groupRatesForPresentation from "../../utils/groupRatesForPresentation.js";
import cleanUpResponse from "../../utils/cleanUpResponse.js";

export const RatePresenterContext = createContext(undefined);

export function RatePresenterProvider({ children }) {
    const { loadedData } = useQuoteContext();
    const [parsedData, setParsedData] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedTabId, setSelectedTabId] = useState(null);

    const allTabs = useRef([]);
    const [allItemsInCurrentOccupancy, setAllItemsInCurrentOccupancy] = useState([]);

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

    return (
        <RatePresenterContext.Provider value={{
            parsedData,
            selectedItems,
            setSelectedItems,
            selectedTabId,
            setSelectedTabId,
            selectAll,
            clearSelection,
            selectInverse,
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
