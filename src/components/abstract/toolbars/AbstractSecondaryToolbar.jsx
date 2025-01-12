import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import isEmpty from "../../../utils/isEmpty.js";
import { nanoid } from "nanoid";
import {Fragment} from "react";
import classNames from "../../../utils/classNames.js";

function AbstractDropdown({ title, icon, items }) {
    const NoActionsIndicator = () => (
        <MenuItem>
              <div className="px-4 py-2 text-sm text-gray-500">
                No action allowed on current selection.
              </div>
        </MenuItem>
    );


    return (
        <Menu as="div" className="relative inline-block text-left justify-center px-5"> {/*Here*/}
            <div>
                <MenuButton className="w-full justify-center align-middle">
                    <div className="flex items-center h-9 font-semibold text-gray-500 hover:text-indigo-700 hover:bg-indigo-200 gap-1">
                        <span className="size-4">{icon}</span>
                        <span className="text-sm">{title}</span>
                    </div>
                </MenuButton>
            </div>

            <MenuItems
                className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                {isEmpty(items) ? (
                    <div className="py-1">
                        <NoActionsIndicator />
                    </div>
                ) : (
                    items.map((group) => (
                        <div key={nanoid()} className="py-1">
                            {(Array.isArray(group) ? group : [group]).map((item) => (
                                <MenuItem key={nanoid()}>
                                        <div
                                            className="group flex gap-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 select-none cursor-pointer"
                                            onClick={item.handler}
                                        >
                                            <span className="flex-none mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500">
                                                {item.icon || <Fragment />}
                                            </span>
                                            <span className="grow">
                                                {item.name}
                                            </span>
                                            <span className="flex-none ml-3 font-light items-baseline text-transparent group-hover:text-gray-300 group-data-[focus]:text-gray-400">
                                                {item.shortcutLabel || ""}
                                            </span>
                                        </div>
                                </MenuItem>
                            ))}
                        </div>
                    ))
                )}
            </MenuItems>
        </Menu>
    );
}

export default function AbstractSecondaryToolbar({ actions, className }) {
    const style = classNames("bg-indigo-100 block", className)

    return (
        <div>
            <div className={style}>
                <nav className="flex">
                    {actions && actions.map((action) => (
                        <AbstractDropdown key={nanoid()} title={action.title} icon={action.icon} items={action.items} />
                    ))}
                </nav>
            </div>
        </div>
    );
}