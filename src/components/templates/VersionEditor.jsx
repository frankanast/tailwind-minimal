import 'react'
import {useParams} from "react-router-dom";
import SunEditor, {buttonList} from "suneditor-react";
import {useEffect, useRef, useState} from "react";
import AbstractSecondaryToolbar from "../abstract/toolbars/AbstractSecondaryToolbar.jsx";
import {
    ArrowDownOnSquareStackIcon,
    ArrowDownTrayIcon,
    ArrowUpTrayIcon, BookOpenIcon,
    CheckIcon,
    DocumentTextIcon,
    LanguageIcon,
} from "@heroicons/react/20/solid/index.js";
import 'suneditor/dist/css/suneditor.min.css';
import TemplateImportFromDialog from "./TemplateImportFromDialog.jsx";
import TranslateDialog from "./TranslateDialog.jsx";
import ProofreadDialog from "./ProofreadDialog.jsx";

export default function VersionEditor() {
    const {templateId, modeId, languageId} = useParams()
    const [isDirty, setIsDirty] = useState(false)
    const [importDialogIsOpen, setImportDialogIsOpen] = useState(false)
    const [translateDialogIsOpen, setTranslateDialogIsOpen] = useState(false)
    const [proofreadDialogIsOpen, setProofreadDialogIsOpen] = useState(false)

    const editorInstance = useRef(null)
    const contentRef = useRef("")

    useEffect(() => {
        async function loadVersionContent() {
            try {
                const response = await fetch(
                    `https://programmino-be.onrender.com/download_template?id_=${templateId}&mode=${modeId}&lang=${languageId}`,
                    { cache: 'no-store' }

                )

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

    // Additional features
    const handleLoadFromFile = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.html';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const htmlContent = event.target.result;
                    contentRef.current = htmlContent;
                    if (editorInstance.current) {
                        editorInstance.current.setContents(htmlContent);
                    }
                    setIsDirty(true);
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    const handleExportAs = () => {
        const contentToExport = contentRef.current
        const blob = new Blob([contentToExport], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'exported_content.html'
        a.click();
        URL.revokeObjectURL(url)
    }

    const handleImportFrom = async () => {
        setImportDialogIsOpen(true)
    }

    const handleImportTemplate = async (version) => {
        try {
            // The version object has an 'url' property (see docs on the backend: /template/versions/{templateId})
            const response = await fetch(version.url);

            if (!response.ok) {
                throw new Error("Failed to import version content in current editor.");
            }

            const importedContent = await response.text();

            contentRef.current = importedContent;
            if (editorInstance.current) {
                editorInstance.current.setContents(importedContent);
            }
            setIsDirty(true);

        } catch (error) {
            console.error("Error during content import:", error);
            alert("Error during content import.");
        }
    }

    const handleTranslate = async () => {
        setTranslateDialogIsOpen(true)
    };

    const handleTranslateTemplate = async (language) => {
        try {
            const contentToTranslate = contentRef.current;
            const response = await fetch("https://programmino-be.onrender.com/ai_translate_template", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to_lang: language,
                    content: contentToTranslate,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to translate");
            }

            const translatedHtml = await response.json();
            contentRef.current = translatedHtml;

            if (editorInstance.current) {
                editorInstance.current.setContents(translatedHtml.content);
            }

            setIsDirty(true);

        } catch (error) {
            console.error("Error during AI translation", error);
            alert(`Error during AI translation: ${error}`);
        }
    }

    const handleProofread = async () => {
        setProofreadDialogIsOpen(true)
    }

    const handleProofreadTemplate = async () => {
        try {
            const contentToReview = contentRef.current;
            const response = await fetch("https://programmino-be.onrender.com/ai_proofread_template", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: contentToReview,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to proofread.");
            }

            const review = await response.json();
            contentRef.current = review;

            if (editorInstance.current) {
                editorInstance.current.setContents(review.content);
            }

            setIsDirty(true);

        } catch (error) {
            console.error("Error during AI proofreading", error);
            alert(`Error during AI proofreading: ${error}`);
        }
    };


    const toolbarItems = [
        {
            title: 'File',
            icon: <DocumentTextIcon />,
            items: [
                [
                    {
                        name: 'Load from file...', icon: <ArrowDownOnSquareStackIcon />, shortcutLabel: "", handler: handleLoadFromFile
                    },
                    {
                        name: 'Import from...', icon: <ArrowDownOnSquareStackIcon />, shortcutLabel: "", handler: handleImportFrom
                    },
                ],
                [
                    {
                        name: 'Save', icon: <ArrowUpTrayIcon />, shortcutLabel: "", handler: () => handleSave()
                    },
                    {
                        name: 'Export as...', icon: <ArrowDownTrayIcon />, shortcutLabel: "", handler: handleExportAs
                    },
                ]
            ]
        },
        {
            title: 'Content',
            icon: <BookOpenIcon />,
            items: [
                {
                    name: 'Translate with AI...', icon: <LanguageIcon/>, shortcutLabel: "", handler: handleTranslate
                },
                {
                    name: 'Proofread', icon: <CheckIcon />, shortcutLabel: "", handler: handleProofread
                },
            ]
        },
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
            <TemplateImportFromDialog
                open={importDialogIsOpen}
                setOpen={setImportDialogIsOpen}
                onImport={handleImportTemplate}
            />
            <TranslateDialog
                open={translateDialogIsOpen}
                setOpen={setTranslateDialogIsOpen}
                onTranslate={handleTranslateTemplate}
            />
            <ProofreadDialog
                open={proofreadDialogIsOpen}
                setOpen={setProofreadDialogIsOpen}
                onProofread={handleProofreadTemplate}
            />

        </div>
    )
}