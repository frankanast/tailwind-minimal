import { createContext, useContext, useState } from "react";
import {nanoid} from "nanoid";

export const QuoteContext = createContext(undefined);

export function QuoteProvider({ children }) {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const [occupancy, setOccupancy] = useState([
        {key: nanoid(), adults: 2, children: 0},
    ]);

    const [requestData, setRequestData] = useState(undefined)
    const [manipulatedData, setManipulatedData] = useState(undefined)

    //const [rates, setRates] = useState([]);

    return (
        <QuoteContext.Provider value={{
            checkInDate,
            setCheckInDate,
            checkOutDate,
            setCheckOutDate,
            occupancy,
            setOccupancy,
            requestData,
            setRequestData,
            manipulatedData,
            setManipulatedData,
        }}>
            {children}
        </QuoteContext.Provider>
    );
}

export function useQuoteContext() {
    const context = useContext(QuoteContext);

    if (context === undefined) {
        throw new Error('useQuoteContext must be used within a QuoteProvider')
    }

    return context;
}