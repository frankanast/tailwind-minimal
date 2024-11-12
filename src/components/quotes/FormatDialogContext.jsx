import {createContext, useContext, useEffect, useState} from "react";
import {useQuoteContext} from "./QuoteContext.jsx";

export const FormatDialogContext = createContext(undefined);

export function FormatDialogProvider({ children }) {
    // Format dialog allows to hide and/or show rooms and rates amongst all possible ones, whether available or not.
    // In practice, this means it is a way to "force" the rates and rooms presented, which are normally got from loadedData.
    // Format allows the user to remove rates and rooms, or to add rate/rooms that are not in loadedData (use cases: overbooking, private sales, virtual rooms...)
    // For these reasons, it works on loadedData rather than parsedData.

    const [formatDialogIsOpen, setFormatDialogIsOpen] = useState(false);
    const {loadedData} = useQuoteContext();

    const [hiddenRates, setHiddenRates] = useState([]);
    const [hiddenRooms, setHiddenRooms] = useState([]);

    // Remove hidden rooms/rates
    useEffect(() => {
        hiddenRates.map((rate) => {
            loadedData.forEach(obj => {
                if (obj.rate === rate) {
                    obj.amount = 0;
                }
            });
        })
    }, [loadedData, hiddenRates]);

    return (
        <FormatDialogContext.Provider value={{
            formatDialogIsOpen,
            setFormatDialogIsOpen,
            loadedData,
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
