import 'react'
import {DocumentTextIcon, QueueListIcon} from "@heroicons/react/20/solid/index.js";
import AbstractSecondaryToolbar from "../abstract/toolbars/AbstractSecondaryToolbar.jsx";
import TemplateDesigner from "../abstract/TemplateDesigner.tsx";


export function TemplateContentEditor() {
    const toolbarItems = [
        {
            title: 'File',
            icon: <DocumentTextIcon/>,
            items: [
                [
                    {
                        name: 'Import', icon: <QueueListIcon/>, shortcutLabel: "", handler: () => {
                        }
                    },
                    {
                        name: 'Import from template', icon: <QueueListIcon/>, shortcutLabel: "", handler: () => {
                        }
                    },
                    {
                        name: 'import from version', icon: <QueueListIcon/>, shortcutLabel: "", handler: () => {
                        }
                    },
                    {
                        name: 'Improve HTML...', icon: <QueueListIcon/>, shortcutLabel: "", handler: () => {
                        }
                    },
                ],
                [
                    {
                        name: 'Translate with AI...', icon: <QueueListIcon/>, shortcutLabel: "", handler: () => {
                        }
                    },
                    {
                        name: 'Proofread', icon: <QueueListIcon/>, shortcutLabel: "", handler: () => {
                        }
                    },

                ],
                [
                    {
                        name: 'Save', icon: <QueueListIcon/>, shortcutLabel: "", handler: () => {
                        }
                    },
                    {
                        name: 'Export', icon: <QueueListIcon/>, shortcutLabel: "", handler: () => {
                        }
                    },
                ]
            ]
        },
        {
            title: 'Snippets',
            icon: <DocumentTextIcon/>,
            items: []
        },
    ]

    return (
        <div className="flex flex-col h-full">
            <AbstractSecondaryToolbar actions={toolbarItems}/>
            <div className="flex-1 overflow-auto">
                <TemplateDesigner onSave={() => {alert("save!")}}/>
            </div>

        </div>
    );
}