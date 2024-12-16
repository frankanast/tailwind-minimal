import {createContext, useContext} from "react";
import {useQuery} from "@tanstack/react-query";

export const TemplateContext = createContext(undefined);

export function TemplateProvider({children}) {
    const { data: templatesData, isError, isFetching, refetch } = useQuery({
        queryKey: ["templates", {}],
        queryFn: async () => {
            const url = "https://programmino-be.onrender.com/templates";
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch settings due to network issues.");
            }

            return await response.json();
        },
        enabled: true,
    });

    return (
        <TemplateContext.Provider value={{
            isError,
            isFetching,
            templatesData,
        }}>
            {children}
        </TemplateContext.Provider>
    );
}

export function useTemplateContext() {
    const context = useContext(TemplateContext);

    if (context === undefined) {
        throw new Error('useTemplateContext must be used within a TemplateProvider');
    }

    return context;
}