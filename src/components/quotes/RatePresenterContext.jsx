import {createContext, useContext, useState} from "react";

export const RatePresenterContext = createContext(undefined);

export function RatePresenterProvider({ children }) {
    const [parsedData, setParsedData] = useState(undefined);

    return (
        <RatePresenterContext.Provider value={{
            parsedData,
            setParsedData,
        }}>
            {children}
        </RatePresenterContext.Provider>
    );
}

export function useRatePresenterContext() {
    const context = useContext(RatePresenterContext);

    if (context === undefined) {
        throw new Error('useRatePresenterContext must be used within a RatePresenterProvider')
    }

    return context;
}