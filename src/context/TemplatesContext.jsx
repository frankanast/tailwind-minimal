import {createContext, useContext, useEffect, useState} from "react";
import {useSettingsContext} from "./SettingsContext.jsx";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
export const TemplateContext = createContext(undefined);

export function TemplateProvider({children}) {
    const {templates, templatesMetadata} = useSettingsContext()
    const [orderedTemplates, setOrderedTemplates] = useState([])
    const [filterCriteria, setFilterCriteria] = useState("all")
    const [sortCriteria, setSortCriteria] = useState("name-az")

    useEffect(() => {
        if (!templatesMetadata) return [];
        let filteredTemplates = templatesMetadata;

        // Filtering logic
        if (filterCriteria && filterCriteria !== "all") {
            if (Array.isArray(filterCriteria) && filterCriteria.length > 0) {
                filteredTemplates = filteredTemplates.filter(([, templateDetails]) =>
                    filterCriteria.includes(templateDetails.status)
                );
            } else if (typeof filterCriteria === "string") {
                filteredTemplates = filteredTemplates.filter(([, templateDetails]) =>
                    templateDetails.status === filterCriteria
                );
            }
        }

        // Sorting logic
        if (sortCriteria === "name-az") {
            filteredTemplates = [...filteredTemplates].sort(([, aDetails], [, bDetails]) =>
                (aDetails.name || "").localeCompare(bDetails.name || "")
            );
        } else if (sortCriteria === "name-za") {
            filteredTemplates = [...filteredTemplates].sort(([, aDetails], [, bDetails]) =>
                (bDetails.name || "").localeCompare(aDetails.name || "")
            );
        } else if (sortCriteria === "code-az") {
            filteredTemplates = [...filteredTemplates].sort(([, aDetails], [, bDetails]) =>
                (aDetails.code || "").localeCompare(bDetails.code || "")
            );
        } else if (sortCriteria === "code-za") {
            filteredTemplates = [...filteredTemplates].sort(([, aDetails], [, bDetails]) =>
                (bDetails.code || "").localeCompare(aDetails.code || "")
            );
        } else if (sortCriteria === "status-az") {
            filteredTemplates = [...filteredTemplates].sort(([, aDetails], [, bDetails]) =>
                (aDetails.mapping_status || "").localeCompare(bDetails.mapping_status || "")
            );
        } else if (sortCriteria === "status-za") {
            filteredTemplates = [...filteredTemplates].sort(([, aDetails], [, bDetails]) =>
                (bDetails.mapping_status || "").localeCompare(aDetails.mapping_status || "")
            );
        }

        setOrderedTemplates(filteredTemplates);

    }, [filterCriteria, sortCriteria, templatesMetadata]);

    // Update isCurrentlyEditingTemplate from the URL
    const { templateId } = useParams()
    const [isCurrentlyEditingTemplate, setIsCurrentlyEditingTemplate] = useState(null)
    useEffect(() => {
        setIsCurrentlyEditingTemplate(templateId);
    }, [templateId]);

    const { data: versions, isLoadingVersions, isErrorVersions, refetch, error } = useQuery({
        queryKey: ['versions', {}],
        queryFn: async () => {
            const response = await fetch(`https://programmino-be.onrender.com/template/versions/${isCurrentlyEditingTemplate}`);
            if (!response.ok) {
                throw new Error(`Could not load versions of this template: ${isCurrentlyEditingTemplate}`);
            }

            return response.json()
        },
        enabled: true,
    });

    async function addTemplate(code, data) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const bodyData = data || {
            code: code,
            name: "Unnamed Template",
            langs: ["en"],
            modes: ["std"],
            tags: [""],
            status: "provisional",
            priority: 1,
            lastUpdate: currentTimestamp
        };

        try {
            const response = await fetch(`https://programmino-be.onrender.com/template/${code}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create the template. Make sure to use a new, unique code.");
            }

            const result = await response.json();
            alert(`Template "${code}" has been created successfully!`);
            console.log(result.message)
            refetch()

        } catch (error) {
            console.error("Error creating template:", error);
            alert("Error creating template.");
        }
    }

    async function deleteTemplate(templateId) {
        try {
            const response = await fetch(`https://programmino-be.onrender.com/template/${templateId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete template.`);
            }

            const result = await response.json();
            alert(result.message || "Success, but with errors. ");

        } catch (error) {
            console.error("Error deleting template:", error);
            alert("Error deleting template.");
        }
    }

    async function updateTemplateData(templateId, updatedData) {
        try {
            const response = await fetch(`https://programmino-be.onrender.com/template/${templateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            console.table(updatedData);
            if (!response.ok) {
                throw new Error('Failed to update template.');
            }

            const result = await response.json();
            // Here you could optimistically update local state or refetch your templates
            // e.g., refetch() if using React Query, or manually update 'templates' state
            await refetch()
            console.log('Update successful:', result);

        } catch (error) {
            console.error('Error updating template:', error);
            throw error;
        }
    }

    const [isCurrentlyEditingVersion, setIsCurrentlyEditingVersion] = useState(null)
    const [language, setLanguage] = useState("en")
    const [mode, setMode] = useState("std")
    const [content, setContent] = useState("")

    const updateVersionSelection = (newMode, newLanguage) => {
        setLanguage(newLanguage);
        setMode(newMode);
        console.log(`Selected ${newMode} ${newLanguage} for template ${isCurrentlyEditingTemplate}`)
    }

    useEffect(() => {
        updateVersionSelection("std", "en")
    }, [isCurrentlyEditingTemplate])

    async function loadVersionContent() {
        try {
            const response = await fetch(
                `https://programmino-be.onrender.com/download_template?id_=${isCurrentlyEditingTemplate}&mode=${mode}&lang=${language}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/html',
                },
            });

            console.log(`https://programmino-be.onrender.com/download_template?id_=${isCurrentlyEditingTemplate}&mode=${mode}&lang=${language}`)

            if (!response.ok) {
                throw new Error("Failed to load version's content.");
            }

            setContent(await response.text())
            console.log(content)

        } catch (error) {
            console.error("Error loading version's content:", error);
            throw error;
        }
    }

    useEffect(() => {
        //const userOk = confirm("If you switch version without saving first, all your edits will be lost. Continue?")
        //if (userOk) {
            loadVersionContent().then(r => console.log(r));
        //}

    }, [language, mode])



    return (
        <TemplateContext.Provider value={{
            isCurrentlyEditingTemplate,
            setIsCurrentlyEditingTemplate,
            isCurrentlyEditingVersion,
            setIsCurrentlyEditingVersion,
            templates,
            addTemplate,
            deleteTemplate,
            updateTemplateData,
            orderedTemplates,
            setFilterCriteria,
            setSortCriteria,
            versions,
            mode,
            language,
            content,
            setContent,
            updateVersionSelection,
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