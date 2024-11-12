import {createContext, useContext, useState} from "react";

export const FormatDialogContext = createContext(undefined);

export function FormatDialogProvider({ children }) {
    const [formatDialogIsOpen, setFormatDialogIsOpen] = useState(false);

    return (
        <FormatDialogContext.Provider value={{
            formatDialogIsOpen,
            setFormatDialogIsOpen,
        }}>
            {children}
        </FormatDialogContext.Provider>
    );
}

export function useFormatDialogContext() {
    const context = useContext(FormatDialogContext);
    if (context === undefined) {
        throw new Error('useFormatDialogContext must be used within a FormatDialogProvider');
    }
    return context;
}
