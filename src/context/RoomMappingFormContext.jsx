import {createContext, useContext, useEffect, useState} from "react";
import {useSettingsContext} from "./SettingsContext.jsx";

export const RoomMappingFormContext = createContext(undefined);

export function RoomMappingFormProvider({children}) {
    const {rooms} = useSettingsContext()
    const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(null)

    const [name, setName] = useState({ it: "", en: "" });
    const [shortName, setShortName] = useState({ it: "", en: "" });
    const [abbr, setAbbr] = useState("");
    const [description, setDescription] = useState({ it: "", en: "" });
    const [url, setUrl] = useState({ it: "", en: "" });
    const [imageUrl, setImageUrl] = useState("");
    const [priority, setPriority] = useState(0);
    const [virtualRoom, setVirtualRoom] = useState(false);
    const [hiddenByDefault, setHiddenByDefault] = useState(false);
    const [mappingStatus, setMappingStatus] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(0)

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
            setSelectedCategory(data.category || "");
            setLastUpdateTimestamp(data.last_updated || "");
        }
    }, [isCurrentlyEditing, rooms]);

    function resetForm() {
        setName({ it: "", en: "" });
        setShortName({ it: "", en: "" });
        setAbbr("");
        setDescription({ it: "", en: "" });
        setUrl({ it: "", en: "" });
        setImageUrl("");
        setPriority(0);
        setVirtualRoom(false);
        setHiddenByDefault(false);
        setMappingStatus("");
        setSelectedCategory("");
        // setLastUpdateTimestamp(0);
        setIsCurrentlyEditing(null);
    }

    async function commitChanges() {
        if (isCurrentlyEditing === null || isCurrentlyEditing === undefined) return;

        const currentTimestamp = Date.now() / 1000;

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
            url: {
                it: url.it || "https://www.borgosanfelice.com",
                en: url.en || "https://www.borgosanfelice.com/en/index"
            },
            picture: imageUrl || "",
            category: selectedCategory?.id || "",
            signature_suite: selectedCategory === "SIGNST",
            villa: selectedCategory === "VILLA",
            virtual_room: virtualRoom,
            hidden_by_default: hiddenByDefault,
            mapping_status: mappingStatus?.id || "provisional",
            last_update: currentTimestamp,
            priority: priority || 999,
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
            alert("Error updating room.");
        }
    }

    async function deleteRoom() {
        if (isCurrentlyEditing === null || isCurrentlyEditing === undefined) return;

        try {
            const response = await fetch(`https://programmino-be.onrender.com/rooms/${isCurrentlyEditing}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to delete room.`);
            }

            const result = await response.json();
            alert(result.message || "Success, but with errors. ");

        } catch (error) {
            console.error("Error updating room:", error);
            alert("Error updating room.");
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
                deleteRoom,
            }}
        >
            {children}
        </RoomMappingFormContext.Provider>
    );
}

export function useRoomMappingContext() {
    const context = useContext(RoomMappingFormContext);

    if (context === undefined) {
        throw new Error('useRoomMappingFormContext must be used within a RoomMappingFormProvider');
    }

    return context;
}