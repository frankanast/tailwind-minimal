import { createContext, useContext, useState } from "react";
import {nanoid} from "nanoid";

export const QuoteContext = createContext(undefined);

export function QuoteProvider({ children }) {
    const [dates, setDates] = useState({ checkIn: "", checkOut: "" });

    const [occupancy, setOccupancy] = useState([
        {key: nanoid(), adults: 2, children: 0},
        {key: nanoid(), adults: 2, children: 1},
    ]);

    const [rates, setRates] = useState([]);

    return (
        <QuoteContext.Provider value={{dates, setDates, occupancy, setOccupancy, rates, setRates}}>
            {children}
        </QuoteContext.Provider>
    );
}

export function useQuoteContext() {
    const context = useContext(QuoteContext);

    if (context === undefined) {
        throw new Error('useQuoteContext must be used within a QuoteProvider');
    }

    return context;
}