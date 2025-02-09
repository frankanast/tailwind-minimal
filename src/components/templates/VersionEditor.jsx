import 'react'
import {useParams} from "react-router-dom";
import SunEditor, {buttonList} from "suneditor-react";
import {useEffect, useRef, useState} from "react";
import AbstractSecondaryToolbar from "../abstract/toolbars/AbstractSecondaryToolbar.jsx";
import {
    ArrowDownOnSquareStackIcon,
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    CheckIcon,
    DocumentTextIcon,
    LanguageIcon,
} from "@heroicons/react/20/solid/index.js";

export default function VersionEditor() {
    const {templateId, modeId, languageId} = useParams()
    //const [versionContent, setVersionContent] = useState(null)
    const [isDirty, setIsDirty] = useState(false)

    const editorInstance = useRef(null)
    const contentRef = useRef("")

    useEffect(() => {
        async function loadVersionContent() {
            try {
                const response = await fetch(`https://programmino-be.onrender.com/download_template?id_=${templateId}&mode=${modeId}&lang=${languageId}`)

                if (!response.ok) {
                    throw new Error("Failed to load version content")

                }

                const data = await response.text()
                contentRef.current = data

                if (editorInstance.current) {
                    editorInstance.current.setContents(data)
                }

            } catch (error) {
                console.error("Error loading version content", error);
            }
        }
        loadVersionContent()
    }, [templateId, modeId, languageId])

    // useEffect(() => {
    //     if (editorInstance.current && versionContent) {
    //         editorInstance.current.setContents(versionContent)
    //     }
    //
    // }, [versionContent]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirty) {
                e.preventDefault()
                e.returnValue = ""
            }
        }
        
        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
        
    }, [isDirty]);

    const handleEditorChange = (content) => {
        contentRef.current = content
        setIsDirty(true)
    }

    const handleSave = async (currentContent) => {
        try {
            const contentToSave = currentContent || contentRef.current
            const response = await fetch("https://programmino-be.onrender.com/upload_version", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_: templateId,
                    mode: modeId,
                    lang: languageId,
                    content: contentToSave,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to update version content")
            }

            alert("Content saved successfully!")
            setIsDirty(false)

        } catch (error) {
            console.error("Error updating template version:", error);
            alert("Error updating template version.");
        }
    }

    const toolbarItems = [
        {
            title: 'File',
            icon: <DocumentTextIcon/>,
            items: [
                [
                    {
                        name: 'Load from file...', icon: <ArrowDownOnSquareStackIcon />, shortcutLabel: "", handler: () => {}
                    },
                    {
                        name: 'Import from...', icon: <ArrowDownOnSquareStackIcon />, shortcutLabel: "", handler: () => {}
                    },
                ],
                [
                    {
                        name: 'Save', icon: <ArrowUpTrayIcon />, shortcutLabel: "", handler: () => handleSave()
                    },
                    {
                        name: 'Export as...', icon: <ArrowDownTrayIcon />, shortcutLabel: "", handler: () => {}
                    },
                ]
            ]
        },
        {
            title: 'Content',
            icon: <DocumentTextIcon/>,
            items: [
                {
                    name: 'Translate with AI...', icon: <LanguageIcon/>, shortcutLabel: "", handler: () => {}
                },
                {
                    name: 'Proofread', icon: <CheckIcon />, shortcutLabel: "", handler: () => {}
                },
            ]
        },
        // {
        //     title: 'Snippets',
        //     icon: <DocumentTextIcon/>,
        //     items: []
        // },
    ]

    return (
        <div>
            <AbstractSecondaryToolbar actions={toolbarItems} />
            <SunEditor
                name="versionEditor"
                height="100%"
                width="100%"
                getSunEditorInstance={(instance) => {
                    editorInstance.current = instance;
                    if (contentRef.current) {
                        instance.setContents(contentRef.current);
                    }
                }}
                setOptions={{
                    buttonList: buttonList.complex,
                    callBackSave: handleSave,
                }}
                onChange={handleEditorChange}
            />
        </div>
    )
}