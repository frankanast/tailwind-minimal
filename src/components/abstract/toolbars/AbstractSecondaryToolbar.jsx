import PropTypes from "prop-types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import classNames from "../../../utils/classNames.js";
import isEmpty from "../../../utils/isEmpty.js";
import { nanoid } from "nanoid";
import {ArrowDownIcon} from "@heroicons/react/16/solid/index.js";

// Abstracted Dropdown Component
function AbstractDropdown({ title, icon, items }) {
    const NoActionsIndicator = () => (
        <MenuItem>
              <div className="px-4 py-2 text-sm text-gray-500">
                No action allowed on current selection.
              </div>
        </MenuItem>
    );

    return (
        <Menu as="div" className="relative inline-block text-left justify-center">
            <div>
                <MenuButton className="w-full justify-center align-middle gap-x-1.5">
                    <div className="flex h-7 w-auto p-1 px-3 my-1 items-center border-none rounded-full font-semibold text-gray-600 ring-1 ring-inset ring-gray-300 hover:text-indigo-600 hover:bg-indigo-200 gap-1">
                        <span className="size-4">{icon}</span>
                        <span className="text-sm">{title}</span>
                    </div>
                </MenuButton>
            </div>

            <MenuItems
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                {isEmpty(items) ? (
                    <div className="py-1">
                        <NoActionsIndicator />
                    </div>
                ) : (
                    items.map((group, index) => (
                        <div key={nanoid()} className="py-1">
                            {(Array.isArray(group) ? group : [group]).map((item) => (
                                <MenuItem key={nanoid()}>
                                    <a
                                        href={item.href || "#"}
                                        className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        onClick={item.handler}
                                    >
                                        {item.icon && (
                                            <span className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500">
                                                {item.icon}
                                            </span>
                                        )}
                                        {item.name}
                                    </a>
                                </MenuItem>
                            ))}
                            {index < items.length - 1 && <div className="border-t border-gray-200 my-1"></div>}
                        </div>
                    ))
                )}
            </MenuItems>
        </Menu>
    );
}

AbstractDropdown.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element,
    items: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                href: PropTypes.string,
                icon: PropTypes.element,
                handler: PropTypes.func,
            }),
            PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    href: PropTypes.string,
                    icon: PropTypes.element,
                    handler: PropTypes.func,
                })
            ),
        ])
    ).isRequired,
};

// Main toolbar component
export default function AbstractSecondaryToolbar({ modes, actions }) {
    return (
        <div>
            {/* Mobile-dedicated layout. */}
            <div className="sm:hidden">
                <select
                    id="tabs"
                    name="tabs"
                    defaultValue={modes.find((tab) => tab.current)?.name || ""}
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                >
                    {/*Rendering modes: standard, tailored */}
                    {modes.map((item) => (
                        <option key={item.name}>{item.name?.toUpperCase()}</option>
                    ))}
                </select>
                {actions && actions.map((action) => (
                    <AbstractDropdown key={nanoid()} title={action.title} icon={action.icon} items={action.items} />
                ))}
            </div>

            {/* Desktop-dedicated layout. */}
            <div className="hidden bg-indigo-100 sm:block ">
                <nav className="flex space-x-4">
                    {/*Rendering modes: standard, tailored */}
                    {modes.map((item) => (
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

                    {/*spacer div*/}
                    <div className="flex-grow" />

                    {/*Rendering dropdown buttons w/ actions*/}
                    {actions && actions.map((action) => (
                        <AbstractDropdown key={nanoid()} title={action.title} icon={action.icon} items={action.items} />
                    ))}
                </nav>
            </div>
        </div>
    );
}

AbstractSecondaryToolbar.propTypes = {
    modes: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string,
            current: PropTypes.bool,
        })
    ).isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            icon: PropTypes.element,
            items: PropTypes.arrayOf(
                PropTypes.oneOfType([
                    PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        href: PropTypes.string,
                        icon: PropTypes.element,
                        handler: PropTypes.func,
                    }),
                    PropTypes.arrayOf(
                        PropTypes.shape({
                            name: PropTypes.string.isRequired,
                            href: PropTypes.string,
                            icon: PropTypes.element,
                            handler: PropTypes.func,
                        })
                    ),
                ])
            ).isRequired,
        })
    ).isRequired,
};
