import "react";
import { Editor } from "@monaco-editor/react";
import { useParams } from "react-router";
import { CodeBracketIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import classNames from "../../utils/classNames.js";
import {ChevronDownIcon, DocumentTextIcon} from "@heroicons/react/16/solid";
import {NavLink, Outlet} from "react-router-dom";
import {QueueListIcon, ScissorsIcon, Cog6ToothIcon} from "@heroicons/react/20/solid/index.js";
import UkFlagIcon from "../../assets/icons/UkFlagIcon.jsx";
import ItalyFlagIcon from "../../assets/icons/ItalyFlagIcon.jsx";

export default function TemplateEditor() {
    const params = useParams();
    const tabs = [
        { name: "Options", to: `/templates/${params.templateId}/options`, icon: Cog6ToothIcon },
        { name: "Design", to: `/templates/${params.templateId}/design`, icon: PencilSquareIcon },
        { name: "Source", to: `/templates/${params.templateId}/source`, icon: CodeBracketIcon },
    ];

    const toolbarItems = [
        {
            title: 'Mode',
            icon: <QueueListIcon />,
            items: [
                [
                    { name: 'Standard', icon: <QueueListIcon />, shortcutLabel: "", handler: () => {} },
                    { name: 'Tailored', icon: <ScissorsIcon />, shortcutLabel: "", handler: () => {} },
                ],
            ]
        },
        {
            title: 'Language',
            icon: <UkFlagIcon />,
            items: [
                [
                    { name: 'Italian', icon: <ItalyFlagIcon />, shortcutLabel: "", handler: () => {} },
                    { name: 'English', icon: <UkFlagIcon />, shortcutLabel: "", handler: () => {} },
                ],
            ]
        },
        {
            title: 'Content',
            icon: <DocumentTextIcon />,
            items: [
                [
                    { name: 'Import', icon: <QueueListIcon />, shortcutLabel: "", handler: () => {} },
                    { name: 'Import from template', icon: <QueueListIcon />, shortcutLabel: "", handler: () => {} },
                    { name: 'Copy from language', icon: <QueueListIcon />, shortcutLabel: "", handler: () => {} },
                    { name: 'Improve HTML...', icon: <QueueListIcon />, shortcutLabel: "", handler: () => {} },
                ],
                [
                    { name: 'Translate with AI...', icon: <QueueListIcon />, shortcutLabel: "", handler: () => {} },
                    { name: 'Proofread', icon: <QueueListIcon />, shortcutLabel: "", handler: () => {} },
                    { name: 'Stats', icon: <QueueListIcon />, shortcutLabel: "", handler: () => {} },

                ],
                [
                    { name: 'Save', icon: <QueueListIcon />, shortcutLabel: "", handler: () => {} },
                    { name: 'Export', icon: <QueueListIcon />, shortcutLabel: "", handler: () => {} },
                ]
            ]
        },
        {
            title: 'Snippets',
            icon: <DocumentTextIcon />,
            items: []
        },
    ]

    return (
        <>
            <div>
                {/* Mobile: Dropdown */}
                <div className="grid grid-cols-1 sm:hidden">
                    <select
                        defaultValue="Design"
                        aria-label="Select a tab"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white
                       py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1
                       outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2
                       focus:outline-indigo-600"
                    >
                        {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                        ))}
                    </select>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5
                       self-center justify-self-end fill-gray-500"
                    />
                </div>

                {/* Desktop: Tabs */}
                <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                        <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                                <NavLink
                                    key={tab.name}
                                    to={tab.to}
                                    className={({ isActive }) =>
                                        classNames(
                                            isActive
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                            "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium"
                                        )
                                    }
                                >
                                    <tab.icon
                                        aria-hidden="true"
                                        className={"text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 size-5"}
                                    />
                                    <span>{tab.name}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            <div>
                <Outlet />
            </div>
        </>
    );
}
