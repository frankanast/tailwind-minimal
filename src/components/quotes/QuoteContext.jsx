import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";
import formatOccupancyWithAges from "../../utils/formatOccupancyWithAges.js";
import formatDateForBackend from "../../utils/formatDateForBackend.js";

const BACKEND_ROOT = "https://programmino-be.onrender.com";

export const QuoteContext = createContext(undefined);

export function QuoteProvider({ children }) {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const [occupancy, setOccupancy] = useState([
        { key: nanoid(), adults: 2, children: 0 },
    ]);

    const { data: loadedData, isError, isFetching } = useQuery({
        queryKey: ["avail", { checkInDate, checkOutDate, occupancy }],
        queryFn: async () => {
            const url = `${BACKEND_ROOT}/avail/loose/?check_in=${formatDateForBackend(checkInDate)}&check_out=${formatDateForBackend(checkOutDate)}&rooms=${formatOccupancyWithAges(occupancy)}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch rates due to network issues.");
            }

            return await response.json();
        },
        enabled: !!checkInDate && !!checkOutDate // Only run if check-in/out dates are available
    });

    return (
        <QuoteContext.Provider value={{
            checkInDate,
            setCheckInDate,
            checkOutDate,
            setCheckOutDate,
            occupancy,
            setOccupancy,
            loadedData,
            isFetching,
            isError,
        }}>
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
