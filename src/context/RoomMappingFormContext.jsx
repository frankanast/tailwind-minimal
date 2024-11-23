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
    const [imageUrl, setImageUrl] = useState("");
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
            setImageUrl(data.picture || "")
            setPriority(data.priority || 0);
            setVirtualRoom(data.virtual_room || false);
            setHiddenByDefault(data.hidden_by_default || false);
            setMappingStatus(data.mapping_status || "");
            setSelectedCategory(data.selectedCategory || "");
            setLastUpdateTimestamp(data.last_updated || "");
        }
    }, [isCurrentlyEditing, rooms]);

    function resetForm() {
        setName("");
        setShortName("");
        setAbbr("");
        setDescription("");
        setUrl("");
        setImageUrl("");
        setPriority(0);
        setVirtualRoom(false);
        setHiddenByDefault(false);
        setMappingStatus("");
        setSelectedCategory("");
        setLastUpdateTimestamp("");
        setIsCurrentlyEditing(null);
    }

    async function commitChanges() {
        if (!isCurrentlyEditing) return;

        const payload = {
            id: isCurrentlyEditing,
            name: {
                it: name.it || "Nessun nome",
                en: name.en || "No name"
            },
            short_name: {
                it: shortName.it || "Nessun nome",
                en: shortName.en || "No name"
            },
            abbr: abbr || "NONAME",
            description: {
                it: description.it || "Nessun nome",
                en: description.en || "No name"
            },
            picture: imageUrl || "",
            signature_suite: (selectedCategory.id === "SIGNST") || false,
            villa: (selectedCategory.id === "VILLA") || false,
            virtual_room: virtualRoom,
            hidden_by_default: hiddenByDefault,
            priority: priority || 999,
            url: {
                it: url.it || "https://www.borgosanfelice.com",
                en: url.en || "https://www.borgosanfelice.com/en/index"
            }
        };

        try {
            const response = await fetch(`https://programmino-be.onrender.com/rooms/${isCurrentlyEditing}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to update room.`);
            }

            const result = await response.json();
            console.log("Room updated successfully:", result);

        } catch (error) {
            console.error("Error updating room:", error);
        }
    }

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
                imageUrl,
                setImageUrl,
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
                resetForm,
                commitChanges,
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