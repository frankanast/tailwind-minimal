import {createContext, useContext, useEffect, useState} from "react";
import {nanoid} from "nanoid";
import { useQuery } from "@tanstack/react-query";
import formatOccupancyWithAges from "../../utils/formatOccupancyWithAges.js";
import formatDateForBackend from "../../utils/formatDateForBackend.js";

const BACKEND_ROOT = "https://programmino-be.onrender.com";

export const QuoteContext = createContext(undefined);

export function QuoteProvider({ children }) {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const [occupancy, setOccupancy] = useState([
        {key: nanoid(), adults: 2, children: 0},
    ]);

    const [loadedData, setLoadedData] = useState(undefined)

    // Metadata query for room and rate info (name, abbr, etc.)
    const { data: metadata, isError: isMetadataError } = useQuery({
        queryKey: ["metadata"],
        queryFn: async () => {
            const response = await fetch(`${BACKEND_ROOT}/settings`);

            if (!response.ok) {
                throw new Error("Unable to fetch metadata due to network issues.");
            }

            return await response.json();
        },
        staleTime: 1000 * 60 * 60 * 2, // Cache metadata for 2 hours
    });

    const { data: rates, isError, isFetching } = useQuery({
        queryKey: ["avail", { checkInDate, checkOutDate, occupancy }],
        queryFn: async () => {
            // use formatDateForBackend to avoid any issues and unexpected behaviour
            const url = `${BACKEND_ROOT}/avail/aggrid/?check_in=${formatDateForBackend(checkInDate)}&check_out=${formatDateForBackend(checkOutDate)}&rooms=${formatOccupancyWithAges(occupancy)}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch rates due to network issues.");
            }

            return await response.json();
        },
        enabled: !!checkInDate && !!checkOutDate // Only run if check-in/out dates are available

    });

    useEffect(() => {
        if (rates && metadata) {
            const { rooms, rates: rateMetadata } = metadata;
            const enrichedData = rates.map((rateData) => {
                const enrichedRows = rateData.rows.map((row) => {
                    return {
                        ...row,
                        roomName: rooms?.[row.room]?.name?.en || row.room,
                    };
                });

                const enrichedColumns = rateData.columns.map((column) => {
                    if (column.field === "room") {
                        return {
                            ...column,
                            field: "roomName", // Update the field to roomName
                            headerName: "Room", // Keep the headerName the same
                        };
                    } else {
                        return {
                            ...column,
                            headerName: rateMetadata?.[column.field]?.name || column.headerName,
                        };
                    }
                });

                return {
                    ...rateData,
                    rows: enrichedRows,
                    columns: enrichedColumns,
                };
            });

            setLoadedData(enrichedData);
        }
    }, [rates, metadata]);


    return (
        <QuoteContext.Provider value={{
            checkInDate,
            setCheckInDate,
            checkOutDate,
            setCheckOutDate,
            occupancy,
            setOccupancy,
            loadedData,
            setLoadedData,
            isFetching,
            isError,
            isMetadataError,
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