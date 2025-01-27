import 'react'
import {
    ArrowDownOnSquareStackIcon,
    DocumentArrowDownIcon,
    DocumentTextIcon,
    FolderArrowDownIcon,
    LanguageIcon,
    QueueListIcon
} from "@heroicons/react/20/solid/index.js";
import AbstractSecondaryToolbar from "../abstract/toolbars/AbstractSecondaryToolbar.jsx";
import TemplateDesigner from "../abstract/TemplateDesigner.tsx";
import {useTemplateContext} from "../../context/TemplatesContext.jsx";
import {ArrowDownTrayIcon, ArrowUpTrayIcon, CheckIcon} from "@heroicons/react/20/solid";
import {FlagIcon} from "@heroicons/react/16/solid/index.js";
import {
    BrazilFlagIcon,
    ChinaFlagIcon, FranceFlagIcon,
    GermanyFlagIcon, ItalyFlagIcon, JapanFlagIcon, RussiaFlagIcon,
    SaudiArabiaFlagIcon,
    SpainFlagIcon,
    UkFlagIcon
} from "../../assets/icons/countryFlags.jsx";

export function TemplateContentEditor() {
    const {versions, updateVersionSelection, content, setContent} = useTemplateContext()

    const modes = {
        std: 'Standard',
        tailored: 'Tailored',
    }

    // Allowed values: 'it', 'en', 'es', 'fr', 'de', 'jp'
    const flagSize = "h-5 w-auto"
    const flags = {
        unnamed: <FlagIcon className={flagSize} />,
        ar: <SaudiArabiaFlagIcon className={flagSize} />,
        ch: <ChinaFlagIcon className={flagSize} />,
        de: <GermanyFlagIcon className={flagSize} />,
        en: <UkFlagIcon className={flagSize} />,
        es: <SpainFlagIcon className={flagSize} />,
        fr: <FranceFlagIcon className={flagSize} />,
        it: <ItalyFlagIcon className={flagSize} />,
        jp: <JapanFlagIcon className={flagSize} />,
        pt: <BrazilFlagIcon className={flagSize} />,
        ru: <RussiaFlagIcon className={flagSize} />,
    }

    const toolbarItems = [
        {
            title: 'Content',
            icon: <DocumentTextIcon/>,
            items: [
                [
                    {
                        name: 'Import', icon: <FolderArrowDownIcon />, shortcutLabel: "", handler: () => {
                        }
                    },
                    {
                        name: 'Import from template', icon: <DocumentArrowDownIcon />, shortcutLabel: "", handler: () => {
                        }
                    },
                    {
                        name: 'Import from version', icon: <ArrowDownOnSquareStackIcon />, shortcutLabel: "", handler: () => {
                        }
                    },
                ],
                [
                    {
                        name: 'Translate with AI...', icon: <LanguageIcon/>, shortcutLabel: "", handler: () => {
                        }
                    },
                    {
                        name: 'Proofread', icon: <CheckIcon />, shortcutLabel: "", handler: () => {
                        }
                    },

                ],
                [
                    {
                        name: 'Save', icon: <ArrowUpTrayIcon />, shortcutLabel: "", handler: () => {
                        }
                    },
                    {
                        name: 'Download as...', icon: <ArrowDownTrayIcon />, shortcutLabel: "", handler: () => {
                        }
                    },
                ]
            ]
        },
        {
            title: 'Versions',
            icon: <DocumentTextIcon/>,
            items: [
                versions.slice(0,6).map(version => {
                    console.log(version)
                    return {
                        name: ` ${version.language}, ${modes[version.mode]}`,
                        icon: flags[version.language],
                        shortcutLabel: "",
                        handler: () => {
                            updateVersionSelection(version.mode, version.language)
                        }
                    }
                }),
                [
                    {
                        name: `All ${Object.keys(versions).length} version${(Object.keys(versions).length >= 0) ? "s" : ""}...`, icon: <QueueListIcon />, shortcutLabel: '', handler: () => {}
                    }
                ]
            ]
        },
        {
            title: 'Snippets',
            icon: <DocumentTextIcon/>,
            items: []
        },
    ]

    const handleEditorChange = (newHtml) => {
        setContent(newHtml);
    };

    return (
        // <div className="flex flex-col h-full">
        <div className="flex flex-col">
            <AbstractSecondaryToolbar actions={toolbarItems}/>
            {/*<div className="flex-1 overflow-scroll overflow-x-hidden">*/}
            <div className="flex-1">
                <TemplateDesigner
                    contents={content}
                    onChange={handleEditorChange}
                    onSave={() => {alert("save!")}}
                />
            </div>
        </div>
    );
}