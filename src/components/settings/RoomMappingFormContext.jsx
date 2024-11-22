import {createContext, useContext, useEffect, useState} from "react";
import {useSettingsContext} from "./SettingsContext.jsx";

export const RoomMappingFormContext = createContext(undefined);

export function RoomMappingFormProvider({children}) {
    const {rooms} = useSettingsContext()
    const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(null)

    const [name, setName] = useState("");
    const [shortName, setShortName] = useState("");
    const [abbr, setAbbr] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [priority, setPriority] = useState(0);
    const [virtualRoom, setVirtualRoom] = useState(false);
    const [hiddenByDefault, setHiddenByDefault] = useState(false);
    const [mappingStatus, setMappingStatus] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState("")

    useEffect(() => {
        if (isCurrentlyEditing !== null) {
            const data = rooms[isCurrentlyEditing] || {};

            setName(data.name || "");
            setShortName(data.short_name || "");
            setAbbr(data.abbr || "");
            setDescription(data.description || "");
            setUrl(data.url || "");
            setPriority(data.priority || 0);
            setVirtualRoom(data.virtual_room || false);
            setHiddenByDefault(data.hidden_by_default || false);
            setMappingStatus(data.mapping_status || "");
            setSelectedCategory(data.selectedCategory || "");
            setLastUpdateTimestamp(data.last_updated || "");
        }
    }, [isCurrentlyEditing, rooms]);

    return (
        <RoomMappingFormContext.Provider
            value={{
                name,
                setName,
                shortName,
                setShortName,
                abbr,
                setAbbr,
                description,
                setDescription,
                url,
                setUrl,
                priority,
                setPriority,
                virtualRoom,
                setVirtualRoom,
                hiddenByDefault,
                setHiddenByDefault,
                mappingStatus,
                setMappingStatus,
                selectedCategory,
                setSelectedCategory,
                isCurrentlyEditing,
                setIsCurrentlyEditing,
                lastUpdateTimestamp,
            }}
        >
            {children}
        </RoomMappingFormContext.Provider>
    );
}

export function useRoomMappingFormContext() {
    const context = useContext(RoomMappingFormContext);

    if (context === undefined) {
        throw new Error('useRoomMappingFormContext must be used within a RoomMappingFormProvider');
    }

    return context;
}