import {createContext, useContext, useEffect, useState} from "react";
import {useQuoteContext} from "./QuoteContext.jsx";
import groupRatesForPresentation from "../../utils/groupRatesForPresentation.js";

export const RatePresenterContext = createContext(undefined);

export function RatePresenterProvider({ children }) {
    const { loadedData } = useQuoteContext();
    const [parsedData, setParsedData] = useState({});
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (loadedData) {
            const parsed = groupRatesForPresentation(loadedData.data, loadedData.metadata);
            setParsedData(parsed);
        }
    }, [loadedData]);

    return (
        <RatePresenterContext.Provider value={{ parsedData, selected, setSelected }}>
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
