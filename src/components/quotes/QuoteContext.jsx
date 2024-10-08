'use client'
import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import {useMutation} from "@tanstack/react-query";
import formatDateAPI from "../../utils/formatDateAPI.js";
import formatOccupancyWithAges from "../../utils/formatOccupancyWithAges.js";

export const QuoteContext = createContext(undefined);

const BASE_URL = "https://programmino-be.onrender.com/avail/byroom/occasc/";

export function QuoteProvider({ children }) {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [occupancy, setOccupancy] = useState([{ key: nanoid(), adults: 2, children: 0 }]);
    const [fetchedData, setFetchedData] = useState(null);

    const fetchAvailability = async ({ checkInDate, checkOutDate, occupancy }) => {
        const params = new URLSearchParams({
            "check_in": formatDateAPI(checkInDate),
            "check_out": formatDateAPI(checkOutDate),
            "rooms": formatOccupancyWithAges(occupancy)
        });

        const url_ = `${BASE_URL}?${params}`

        const response = await fetch(url_);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    };

    const { mutate: loadRates, isLoading, isError } = useMutation({
        mutationFn: fetchAvailability,
        onSuccess: (data) => {
            setFetchedData(data);
        },
        onError: (error) => {
            console.error('Error fetching availability:', error);
        }
    });

    return (
        <QuoteContext.Provider value={{
            checkInDate,
            setCheckInDate,
            checkOutDate,
            setCheckOutDate,
            occupancy,
            setOccupancy,
            fetchedData,
            loadRates,
            isLoading,
            isError
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
