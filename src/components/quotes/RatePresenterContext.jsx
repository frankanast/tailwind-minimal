import {createContext, useContext, useEffect, useState} from "react";
import {useQuoteContext} from "./QuoteContext.jsx";
import groupRatesForPresentation from "../../utils/groupRatesForPresentation.js";
import cleanUpResponse from "../../utils/cleanUpResponse.js";

export const RatePresenterContext = createContext(undefined);

export function RatePresenterProvider({ children }) {
    const { loadedData } = useQuoteContext();
    const [parsedData, setParsedData] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedTabId, setSelectedTabId] = useState(null);


    useEffect(() => {
        if (loadedData) {
            const parsed = groupRatesForPresentation(cleanUpResponse(loadedData.data), loadedData.metadata);
            setParsedData(parsed);

            // First occupancy is selected automatically
            if (parsed && parsed.length > 0) {
                setSelectedTabId(parsed[0].occ_id);
            }
        }
    }, [loadedData]);

    return (
        <RatePresenterContext.Provider value={{parsedData, selectedItems, setSelectedItems, selectedTabId, setSelectedTabId}}>
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
