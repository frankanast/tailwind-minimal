import { createContext, useContext, useState } from "react";
import {nanoid} from "nanoid";

export const QuoteContext = createContext(undefined);

export function QuoteProvider({ children }) {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const [occupancy, setOccupancy] = useState([
        {key: nanoid(), adults: 2, children: 0},
    ]);

    const [rates, setRates] = useState([]);

    return (
        <QuoteContext.Provider value={{
            checkInDate,
            setCheckInDate,
            checkOutDate,
            setCheckOutDate,
            occupancy,
            setOccupancy,
            rates,
            setRates
        }}>
            {children}
        </QuoteContext.Provider>
    );
}

export function useQuoteContext() {
    const context = useContext(QuoteContext);

    if (context === undefined) {
        // Usually, we would throw an error; but in this project, we have components that conditionally use context (calendar).
        //throw new Error('useQuoteContext must be used within a QuoteProvider');
        console.warn("useQuoteContext it's being called from outside a QuoteProvider. Make sure to handle this properly")
        return null
    }

    return context;
}