import {createContext, useContext, useEffect, useState} from "react";
import {useSettingsContext} from "./SettingsContext.jsx";

export const RateMappingFormContext = createContext(undefined);

export function RateMappingFormProvider({children}) {
    const {rates} = useSettingsContext()

    const [isCurrentlyEditingRate, setIsCurrentlyEditingRate] = useState(null)
    const [name, setName] = useState("");
    const [abbr, setAbbr] = useState("");

    const [publicName, setPublicName] = useState({ it: "", en: "" });
    const [includes, setIncludes] = useState({ it: "", en: "" });
    const [cxlPolicy, setCxlPolicy] = useState({ it: "", en: "" });

    const [selectedCategory, setSelectedCategory] = useState("");
    const [isPackage, setIsPackage] = useState(false);
    const [isPrivateSale, setIsPrivateSale] = useState(false);

    const [defaultAmount, setDefaultAmount] = useState(0);
    const [rateMappingStatus, setRateMappingStatus] = useState("");
    const [priority, setPriority] = useState(0);

    const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(0.0)

    useEffect(() => {
        if (isCurrentlyEditingRate !== null) {
            const data = rates[isCurrentlyEditingRate] || {};

            setName(data.name || "");
            setAbbr(data.abbr || "");

            setPublicName(data.public_name || { it: "", en: "" });
            setIncludes(data["includes"] || { it: "", en: "" });
            setCxlPolicy(data.cxl_policy || { it: "", en: "" })

            setSelectedCategory(data.category || "");
            setIsPackage(data.is_package || false);
            setIsPrivateSale(data.is_private_sale || false);

            setDefaultAmount(data.default_amount || 0);
            setRateMappingStatus(data.mapping_status || "");
            setPriority(data.priority || 0);
            setLastUpdateTimestamp(data.last_updated || "");
        }
    }, [isCurrentlyEditingRate, rates]);

    function resetRateForm() {
        setIsCurrentlyEditingRate(null);
        setName("");
        setAbbr("");

        setPublicName( { it: "", en: "" });
        setIncludes({ it: "", en: "" });
        setCxlPolicy({it: "", en: ""})

        setSelectedCategory("");
        setIsPackage(false);
        setIsPrivateSale(false);

        setDefaultAmount(0);
        setRateMappingStatus("");
        setPriority(0);
        setLastUpdateTimestamp(0);
    }

    async function commitRateChanges() {
        if (isCurrentlyEditingRate === null || isCurrentlyEditingRate === undefined) return;

        const currentTimestamp = Date.now() / 1000;

        const payload = {
            id: isCurrentlyEditingRate,
            name: name || "No name",
            abbr: abbr || "NONAME",

            public_name: {
                it: publicName.it || "Nessun nome",
                en: publicName.en || "No name"
            },
            includes: {
                it: includes.it || "Nessun servizio incluso in questo pacchetto.",
                en: includes.en || "No services included in this package rate"
            },
            cxl_policy: {
                it: cxlPolicy.it || "Politiche di cancellazione...",
                en: cxlPolicy.en || "Cancellation policy..."
            },

            category: selectedCategory?.id || "",
            is_package: isPackage,
            is_private_sale: isPrivateSale,

            default_amount: defaultAmount,
            mapping_status: rateMappingStatus?.id || "provisional",
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

    async function deleteRate() {
        if (isCurrentlyEditingRate === null || isCurrentlyEditingRate === undefined) return;

        try {
            const response = await fetch(`https://programmino-be.onrender.com/rates/${isCurrentlyEditingRate}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete rate.`);
            }

            const result = await response.json();
            alert(result.message || "Success, but with errors. ");

        } catch (error) {
            console.error("Error updating rate:", error);
            alert("Error updating rate.");
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
                defaultAmount,
                setDefaultAmount,
                cxlPolicy,
                setCxlPolicy,
                rateMappingStatus,
                setRateMappingStatus,
                priority,
                setPriority,
                lastUpdateTimestamp,
                setLastUpdateTimestamp,
                resetRateForm,
                commitRateChanges,
                deleteRate,
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