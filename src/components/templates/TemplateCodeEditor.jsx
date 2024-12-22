import 'react'
import AbstractSecondaryToolbar from "../abstract/toolbars/AbstractSecondaryToolbar.jsx";
import {DocumentTextIcon, QueueListIcon, ScissorsIcon} from "@heroicons/react/20/solid";
import UkFlagIcon from "../../assets/icons/UkFlagIcon.jsx";
import ItalyFlagIcon from "../../assets/icons/ItalyFlagIcon.jsx";
export function TemplateCodeEditor() {

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
        <div>
            <AbstractSecondaryToolbar items={toolbarItems}/>
        </div>
    );
};