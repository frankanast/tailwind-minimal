import {createContext, useContext, useMemo, useState} from "react";
import { useQuery } from "@tanstack/react-query";

export const SettingsContext = createContext(undefined);

export function SettingsProvider({ children }) {
    const { data: loadedSettings, isError, isFetching, refetch } = useQuery({
        queryKey: ["settings", {}],
        queryFn: async () => {
            const url = "https://programmino-be.onrender.com/settings";
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch settings due to network issues.");
            }

            return await response.json();
        },
        enabled: true,
    });

    const roomCategories = [
        { id: 'SIGNST', name: 'Signature Suites' },
        { id: 'VILLA', name: 'Villas' },
        { id: 'ROOMS', name: 'Rooms' },
        { id: 'ST', name: 'Suites' },
    ];

    const rateCategories = [
        { id: 'DEF', name: 'Default rate' },
        { id: 'BNB', name: 'Bed and Breakfast rates' },
        { id: 'PKG', name: 'Package rates' },
        { id: 'FLEX', name: 'Flexible rates' },
        { id: 'NREF', name: 'Not Refundable rates' },
    ];


    const statuses = [
        {id: "unusable", style: 'text-chestnut-600 bg-chestnut-50 ring-chestnut-500/10', name: "Do not use"},
        {id: "test", style: 'text-gray-600 bg-gray-50 ring-gray-500/10', name: "Test"},
        {id: "draft", style: 'text-gray-600 bg-gray-50 ring-gray-500/10', name: "Work in progress"},
        {id: "provisional", style: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20', name: "Attention required"},
        {id: "deprecated", style: 'text-chestnut-600 bg-chestnut-50 ring-chestnut-500/10', name: "Deprecated"},
        {id: "complete", style: 'text-indigo-700 bg-indigo-50 ring-indigo-600/20', name: "Public"},
    ]

    const roomsMetadata = useMemo(() => loadedSettings ? Object.entries(loadedSettings.rooms) : [], [loadedSettings]);
    const ratesMetadata = useMemo(() => loadedSettings ? Object.entries(loadedSettings.rates) : [], [loadedSettings]);

    const rooms = useMemo(() => {
        return roomsMetadata.reduce((obj, [id, data]) => ({ ...obj, [`${id}`]: data }), {});
    }, [roomsMetadata]);

    const rates = useMemo(() => {
        return ratesMetadata.reduce((obj, [id, data]) => ({ ...obj, [`${id}`]: data }), {});
    }, [ratesMetadata]);

    const [mappingDialogIsOpen, setMappingDialogIsOpen] = useState(false);


    return (
        <SettingsContext.Provider value={{
            statuses,
            roomCategories,
            rateCategories,
            isError,
            isFetching,
            refetch,
            loadedSettings,
            roomsMetadata,
            ratesMetadata,
            rooms,
            rates,
            mappingDialogIsOpen,
            setMappingDialogIsOpen,
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettingsContext() {
    const context = useContext(SettingsContext);

    if (context === undefined) {
        throw new Error('useSettingsContext must be used within a SettingsProvider');
    }

    return context;
}
