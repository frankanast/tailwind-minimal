import 'react'
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import TemplatesList from "./TemplatesList.jsx";
import { useParams, NavLink, Outlet } from "react-router-dom";
import {
    Cog6ToothIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import classNames from "../../utils/classNames.js";
import {Fragment} from "react";
import {useTemplateContext} from "../../context/TemplatesContext.jsx";

export function TemplatesPage() {
    const params = useParams(); // e.g. { templateId: "default" } ; templateId matches <code> in backend
    const {isCurrentlyEditingVersion} = useTemplateContext()

    const tabs = [
        {
            name: "Options",
            to: `/templates/${params.templateId}/options`,
            icon: Cog6ToothIcon,
        },
        {
            name: "Design",
            to: `/templates/${params.templateId}/design`,
            icon: PencilSquareIcon,
        },
    ];

    function Tabs() {
        return (
            tabs.map((tab) => (
                <NavLink
                    key={tab.name}
                    to={tab.to}
                    className={({ isActive }) =>
                        classNames(
                            isActive
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "group inline-flex items-center border-b-2 px-5 py-4 text-sm font-medium"
                        )
                    }
                >
                    <tab.icon
                        aria-hidden="true"
                        className={
                            "text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 size-5"
                        }
                    />
                    <span>{tab.name}</span>
                </NavLink>
            ))
        )
    }

    return (
        <div className="h-screen">
            {/* MOBILE VIEW */}
            <div className="grid grid-cols-1 sm:hidden">
                {/* In mobile, we just show the entire TemplatesList on top. */}
                <TemplatesList/>

                {/* Editing view selection (options, design, code...) */}
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

                {/* The TemplateDesigner or "No template" message will appear below. */}
                <Outlet/>
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden h-full sm:block">
                <PanelGroup direction="horizontal" className="h-full">
                    <Panel defaultSize={25} minSize={25} className="overflow-y-auto">
                        <TemplatesList/>
                    </Panel>
                    <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-400"/>
                    <Panel minSize={10} className="flex flex-col">

                        {/* Container for the tab bar + the editor outlet */}
                            <div className="border-b border-gray-200 gap-3 pr-5">
                                        <nav aria-label="Tabs" className="-mb-px flex justify-between space-x-8">
                                            <span>
                                                {(params.templateId)
                                                    ? <Tabs />
                                                    : <Fragment />
                                                }
                                            </span>
                                            <span className="w-60">
                                                {/*<TemplateVersionsCombobox />*/}
                                                <h3 className="text-sm/6 font-semibold text-gray-900 mt-4 text-right">
                                                    {/*FIXME : SHOULD APPEAR ONLY IN DESIGN MODE*/}
                                                    {isCurrentlyEditingVersion}
                                                </h3>
                                            </span>

                                        </nav>
                                    </div>

                            {/* Here is where the chosen editor (Options/Design/Source) will render */}
                            <div className="flex-1 overflow-y-auto">
                                <Outlet />
                            </div>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}
