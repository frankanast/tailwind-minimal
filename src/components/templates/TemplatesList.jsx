import StatusBadge from "../abstract/StatusBadge.jsx";
import {ChevronRightIcon} from "@heroicons/react/20/solid/index.js";
import {NavLink, useNavigate} from "react-router-dom";
import {useSettingsContext} from "../../context/SettingsContext.jsx";
import formatUnixTimestamp from "../../utils/formatUnixTimestamp.js";
import {BarsArrowDownIcon, EllipsisVerticalIcon, FunnelIcon} from "@heroicons/react/24/outline/index.js";
import {PlusIcon} from "@heroicons/react/24/outline";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";

import classNames from "../../utils/classNames.js";
import {useTemplateContext} from "../../context/TemplatesContext.jsx";

function FilterButton() {
    const {statuses} = useSettingsContext();
    const {setFilterCriteria} = useTemplateContext()

    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton
                className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <span className="sr-only">Open options</span>
                <FunnelIcon aria-hidden="true" className="size-5"/>
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <MenuItem>
                    <div
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        onClick={() => {
                            setFilterCriteria("all")
                        }}
                    >
                        All statuses
                    </div>
                </MenuItem>

                {
                    statuses.map((status) => {
                        return (
                            <MenuItem key={`${status.id}-status`}>
                                <div
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    onClick={() => {
                                        setFilterCriteria(status.id)
                                    }}
                                >
                                    <StatusBadge id={status.id || "test"}/>
                                </div>
                            </MenuItem>
                        );
                    })
                }
            </MenuItems>
        </Menu>
    );
}

function SortButton() {
    const {setSortCriteria} = useTemplateContext()

    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton
                className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <span className="sr-only">Open options</span>
                <BarsArrowDownIcon aria-hidden="true" className="size-5"/>
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={() => {
                                setSortCriteria("name-az")
                            }}
                        >
                            Name (A-Z)
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={() => {
                                setSortCriteria("name-za")
                            }}
                        >
                            Name (Z-A)
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={() => {
                                setSortCriteria("code-az")
                            }}
                        >
                            Template code (A-Z)
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={() => {
                                setSortCriteria("code-za")
                            }}
                        >
                            Template code (Z-A)
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={() => {
                                setSortCriteria("status-az")
                            }}
                        >
                            Status (A-Z)
                        </div>
                    </MenuItem>
                    <MenuItem>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={() => {
                                setSortCriteria("status-za")
                            }}
                        >
                            Status (Z-A)
                        </div>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    );
}

function TemplateItemMenu({templateId}) {
    const navigate = useNavigate()
    const {
        templates,
        addTemplate,
        deleteTemplate,
        refetch
    } = useTemplateContext()

    function handleDelete() {
        if (confirm(
            `
            Important: This action is irreversible. 
            Once a template is deleted, it cannot be restored. 
            We recommend using the 'mapping status' feature to mark templates as unusable instead of deleting them. 
            Are you sure you want to proceed?
            `
        ) === true) {
            console.log("Deleting: ", templateId)  // --> null ???

            deleteTemplate(templateId).then(() => {
                refetch()
                navigate('/templates')
            });
        }
    }

    function handleDuplicate() {
        if (!templates) { return }
        let newTemplateCode = prompt("Please enter a code for the new template: ")

        let newTemplateData = templates[templateId]
        newTemplateData.code = newTemplateCode
        newTemplateData.status = "provisional"
        newTemplateData.lastUpdate = Math.floor(Date.now() / 1000);

        addTemplate(newTemplateCode, newTemplateData).then(() => {
            refetch()
            navigate('/templates')
        });
    }

    return (
        <Menu as="div" className="relative flex-none">
            <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <MenuItem>
                    <button
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                        onClick={handleDuplicate}
                    >
                        Duplicate
                    </button>
                </MenuItem>
                <MenuItem>
                    <button
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                    >
                        Set priority
                    </button>
                </MenuItem>
                <MenuItem>
                    <div
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                        onClick={handleDelete}
                    >
                        Delete
                    </div>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
}

export default function TemplatesList() {
    const navigate = useNavigate()
    const {
        orderedTemplates,
        setIsCurrentlyEditingTemplate,
        addTemplate,
        refetch
    } = useTemplateContext()

    function handleAdd() {
        let newTemplateCode = prompt("Please enter a code for the new template: ")
        addTemplate(newTemplateCode, null).then(() => {
            refetch()
            navigate('/templates')
        });
    }

    return (
        <>
            {/* Heading */}
            <div className="pt-12 pb-2 px-7 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-base font-semibold text-gray-900">Templates</h3>
                <div className="mt-3 flex gap-3 sm:ml-4 sm:mt-0">
                    <FilterButton />
                    <SortButton />
                    <button
                        type="button"
                        className="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleAdd}
                    >
                        <PlusIcon aria-hidden="true" className="size-3"/>
                    </button>
                </div>
            </div>

            {/* Mobile: Dropdown */}
            <div className="grid grid-cols-1 sm:hidden">
                <select
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white
                       py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1
                       outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2
                       focus:outline-indigo-600"
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        setIsCurrentlyEditingTemplate(selectedId);
                    }}
                >
                    {orderedTemplates.map(([templateId, templateDetails]) => (
                        <option
                            key={templateId}
                            value={templateId}
                        >
                            {templateDetails.name} ({templateDetails.code})
                        </option>
                    ))}
                </select>
            </div>

            {/* Desktop: Tabs */}
            <div className="hidden sm:block">
                <ul role="list" className="divide-y divide-gray-100">
                    {orderedTemplates.map(([templateId, templateDetails]) => (
                        <NavLink
                            to={`/templates/${templateId}`}
                            key={templateId}
                            className={({ isActive }) =>
                                classNames(
                                    'relative flex justify-between gap-x-6 px-4 py-5 hover:bg-yellow-50 sm:px-6 lg:px-8',
                                    isActive ? 'bg-yellow-100 hover:bg-yellow-200' : ""
                                )
                            }
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto align-baseline">
                                    <p className="text-sm/6 font-semibold text-gray-900">
                                        {templateDetails.name}
                                    </p>
                                    <div className="mt-1 flex text-xs/5 text-gray-500">
                                        <div className="flex gap-2 relative truncate">
                                            <StatusBadge id={templateDetails.status}/>
                                            <span className="font-mono">{templateDetails.code}</span>
                                        </div>
                                    </div>
                                    <p className="mt-1 flex text-xs/5 text-gray-500">
                                        {formatUnixTimestamp(templateDetails.lastUpdate)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-4">
                                <TemplateItemMenu templateId={templateId} templateDetails={templateDetails} />
                                <ChevronRightIcon aria-hidden="true" className="size-5 flex-none text-gray-400"/>
                            </div>
                        </NavLink>
                    ))}
                </ul>
            </div>
        </>
    )
}
