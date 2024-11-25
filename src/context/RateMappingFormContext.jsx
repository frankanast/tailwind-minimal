import {createContext, useContext, useEffect, useState} from "react";
import {useSettingsContext} from "./SettingsContext.jsx";

export const RateMappingFormContext = createContext(undefined);

export function RateMappingFormProvider({children}) {
    const {rates} = useSettingsContext()
    const [isCurrentlyEditingRate, setIsCurrentlyEditingRate] = useState(null)

    const [name, setName] = useState({ it: "", en: "" });
    const [abbr, setAbbr] = useState("");
    const [publicName, setPublicName] = useState({ it: "", en: "" });
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isPackage, setIsPackage] = useState(false);
    const [includes, setIncludes] = useState({ it: "", en: "" });
    const [isPrivateSale, setIsPrivateSale] = useState(false);
    // const [imageUrl, setImageUrl] = useState("");
    // const [hiddenByDefault, setHiddenByDefault] = useState(false);
    // const [mappingStatus, setMappingStatus] = useState("");
    const [priority, setPriority] = useState(0);
    const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(0)

    useEffect(() => {
        if (isCurrentlyEditingRate !== null) {
            const data = rates[isCurrentlyEditingRate] || {};

            setName(data.name || { it: "", en: "" });
            setAbbr(data.abbr || "");
            setPublicName(data.public_name || { it: "", en: "" });
            setSelectedCategory(data.category || "");
            setIsPackage(data.is_package || false);
            setIncludes(data["includes"] || "");
            setIsPrivateSale(data.is_private_sale || false);
            // setImageUrl(data.picture || "")
            // setHiddenByDefault(data.hidden_by_default || false);
            // setMappingStatus(data.mapping_status || "");
            setPriority(data.priority || 0);
            setLastUpdateTimestamp(data.last_updated || "");
        }
    }, [isCurrentlyEditingRate, rates]);

    function resetForm() {
        setIsCurrentlyEditingRate(null);
        setName({ it: "", en: "" });
        setAbbr("");
        setPublicName( { it: "", en: "" });
        setSelectedCategory("");
        setIsPackage(false);
        setIncludes({ it: "", en: "" });
        setIsPrivateSale(false);
        // setImageUrl("");
        // setHiddenByDefault(false);
        // setMappingStatus("");
        setLastUpdateTimestamp(0);
        setPriority(0);
    }

    async function commitChanges() {
        if (isCurrentlyEditingRate === null || isCurrentlyEditingRate === undefined) return;

        const currentTimestamp = Date.now() / 1000;

        const payload = {
            id: isCurrentlyEditingRate,
            name: {
                it: name.it || "Nessun nome",
                en: name.en || "No name"
            },
            abbr: abbr || "NONAME",
            public_name: {
                it: publicName.it || "Nessun nome",
                en: publicName.en || "No name"
            },
            category: selectedCategory?.id || "",
            is_package: isPackage,
            includes: {
                it: includes.it || "Nessun servizio incluso in questo pacchetto.",
                en: includes.en || "No services included in this package rate"
            },
            is_private_sale: isPrivateSale,
            // picture: imageUrl || "",
            // signature_suite: selectedCategory === "SIGNST",
            // villa: selectedCategory === "VILLA",
            // hidden_by_default: hiddenByDefault,
            // mapping_status: mappingStatus?.id || "provisional",
            priority: priority || 999,
            last_update: currentTimestamp,
        };

        try {
            const response = await fetch(`https://programmino-be.onrender.com/rates/${isCurrentlyEditingRate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to update rate.`);
            }

            const result = await response.json();
            console.log("Rate updated successfully:", result);

        } catch (error) {
            console.error("Error updating rate:", error);
        }
    }

    return (
        <RateMappingFormContext.Provider
            value={{
                isCurrentlyEditingRate,
                setIsCurrentlyEditingRate,
                name,
                setName,
                abbr,
                setAbbr,
                publicName,
                setPublicName,
                selectedCategory,
                setSelectedCategory,
                isPackage,
                setIsPackage,
                includes,
                setIncludes,
                isPrivateSale,
                setIsPrivateSale,

                priority,
                setPriority,
                lastUpdateTimestamp,
                setLastUpdateTimestamp,
                resetForm,
                commitChanges,
            }}
        >
            {children}
        </RateMappingFormContext.Provider>
    );
}

export function useRateMappingContext() {
    const context = useContext(RateMappingFormContext);

    if (context === undefined) {
        throw new Error('useRateMappingFormContext must be used within a RateMappingFormProvider');
    }

    return context;
}