import { createContext, useContext, useState } from "react";

export const QuoteContext = createContext(undefined);

// Only to access context (w/ error handling)
export function useQuoteContext() {
    const context = useContext(QuoteContext);
    const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
    const [occupancy, setOccupancy] = useState({ adults: 2, children: 0 });
    const [rates, setRates] = useState([]);


    if (context === undefined) {
        throw new Error('useQuoteContext must be used within a QuoteProvider');
    }

    return context;
}
