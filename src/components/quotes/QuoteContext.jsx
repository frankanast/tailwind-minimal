'use client'
import { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";
import {useMutation} from "@tanstack/react-query";

export const QuoteContext = createContext(undefined);

const BASE_URL = "https://programmino-be.onrender.com/";

export function QuoteProvider({ children }) {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [occupancy, setOccupancy] = useState([{ key: nanoid(), adults: 2, children: 0 }]);
    const [fetchedData, setFetchedData] = useState(null);

    const fetchAvailability = async ({ checkInDate, checkOutDate, occupancy }) => {
        const params = new URLSearchParams({
            checkIn: checkInDate,
            checkOut: checkOutDate,
            occupancy: JSON.stringify(occupancy.map(o => ({ adults: o.adults, children: o.children })))
        });

        const response = await fetch(`${BASE_URL}availability?${params}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    };

    const { mutate: loadRates, isLoading, isError } = useMutation({
        mutationFn: fetchAvailability, // Use mutationFn key in v5
        onSuccess: (data) => {
            setFetchedData(data); // Store the fetched data in the context
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
            loadRates,   // Expose the mutation function
            isLoading,   // Expose loading state
            isError      // Expose error state
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
