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
        {id: "complete", style: 'text-indigo-700 bg-indigo-50 ring-indigo-600/20', name: "Complete"},
        {id: "deprecated", style: 'text-chestnut-600 bg-chestnut-50 ring-chestnut-500/10', name: "Deprecated"},
        {id: "draft", style: 'text-lavender-600 bg-lavender-50 ring-lavender-600/30', name: "Draft"},
        {id: "provisional", style: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20', name: "Provisional"},
        {id: "test", style: 'text-gray-600 bg-gray-50 ring-gray-500/10', name: "Test"},
        {id: "unusable", style: 'text-chestnut-600 bg-chestnut-50 ring-chestnut-500/10', name: "Unusable"},
    ]

    const roomsMetadata = useMemo(() => loadedSettings ? Object.entries(loadedSettings.rooms) : [], [loadedSettings]);
    const ratesMetadata = useMemo(() => loadedSettings ? Object.entries(loadedSettings.rates) : [], [loadedSettings]);
    const templatesMetadata = useMemo(() => loadedSettings ? Object.entries(loadedSettings.templates) : [], [loadedSettings]);

    const rooms = useMemo(() => {
        return roomsMetadata.reduce((obj, [id, data]) => ({ ...obj, [`${id}`]: data }), {});
    }, [roomsMetadata]);

    const rates = useMemo(() => {
        return ratesMetadata.reduce((obj, [id, data]) => ({ ...obj, [`${id}`]: data }), {});
    }, [ratesMetadata]);

    const templates = useMemo(() => {
        return templatesMetadata.reduce((obj, [code, data]) => ({ ...obj, [`${code}`]: data }), {});
    }, [templatesMetadata]);

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
            templatesMetadata,
            rooms,
            rates,
            templates,
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
