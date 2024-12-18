import {createContext, useContext, useState} from "react";
import {useSettingsContext} from "./SettingsContext.jsx";
export const TemplateContext = createContext(undefined);

export function TemplateProvider({children}) {
    const {templates} = useSettingsContext()

    const [isCurrentlyEditingTemplate, setIsCurrentlyEditingTemplate] = useState(null)

    function addTemplate({code}) {
        alert(`addTemplate: ${code}`)
    }

    return (
        <TemplateContext.Provider value={{
            templates,
            addTemplate,

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