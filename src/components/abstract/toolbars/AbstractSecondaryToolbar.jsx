import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import classNames from "../../../utils/classNames.js";
import {BoltIcon, ChevronDownIcon} from "@heroicons/react/20/solid";
import isEmpty from "../../../utils/isEmpty.js";
import { nanoid } from "nanoid";

export function AbstractSecondaryToolbarActionDropdown({ items }) {

    const NoActionsIndicator = () => {
        return (
            <MenuItem>
                <span className="px-4 py-2 text-sm text-gray-500">
                  No action allowed on current selection.
                </span>
            </MenuItem>
        );
    };

    return (
        <Menu as="div" className="relative inline-block text-left justify-center">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 border-none rounded-full mt-1 px-3 py-1 text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-300 hover:text-indigo-600 hover:bg-indigo-200">
                    <BoltIcon className="m-auto text-gray-600 hover:text-indigo-600" />
                    Actions...
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                // className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    {isEmpty(items) ? (
                        <NoActionsIndicator />
                    ) : (
                        items.map((item) => (
                            <MenuItem key={nanoid()}>
                                <a
                                    href={item.href || "#"}
                                    className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    onClick={item.handler}
                                >
                                    {<span className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500">
                                        {item.icon}
                                    </span> || <Fragment />}
                                    {item.name}
                                </a>
                            </MenuItem>
                        ))
                    )}
                </div>
            </MenuItems>
        </Menu>
    );
}

// Main toolbar component
export default function AbstractSecondaryToolbar({ items, actions }) {
    return (
        <div>
            {/* Mobile-dedicated layout. */}
            <div className="sm:hidden">
                <select
                    id="tabs"
                    name="tabs"
                    defaultValue={items.find((tab) => tab.current)?.name || ""}
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                >
                    {items.map((item) => (
                        <option key={item.name}>{item.name}</option>
                    ))}
                </select>
                {actions ? <AbstractSecondaryToolbarActionDropdown items={actions} /> : <Fragment />}
            </div>

            {/* Desktop-dedicated layout. */}
            <div className="hidden bg-indigo-100 sm:block">
                <nav className="flex space-x-4">
                    {items.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? "bg-gray-200 text-gray-800"
                                    : "text-gray-600 hover:text-indigo-600",
                                "rounded-md px-[20px] py-2 text-sm font-medium"
                            )}
                        >
                            {item.name}
                        </a>
                    ))}
                    <div className="flex-grow" />
                    {actions ? <AbstractSecondaryToolbarActionDropdown items={actions} /> : <Fragment />}
                </nav>
            </div>
        </div>
    );
}
