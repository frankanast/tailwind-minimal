import React from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid';
import toolbarStyles from './toolbarStyles.js';
import QuoteDrawer from '../../quotes/QuoteDrawer.jsx';
import {Bars3Icon} from "@heroicons/react/24/outline";

function SidebarToggle({toggleHandler}) {
    console.log(typeof toggleHandler);
    return (
        <>
            <div onClick={toggleHandler}>
                <Bars3Icon className={toolbarStyles.toggleButton} />
            </div>
        </>
    )
}

export default function AbstractToolbar({ items, toggleHandler }) {
    console.log(typeof toggleHandler);
    return (
        <Popover className="sticky isolate flex justify-between top-0 z-50 h-16 shrink-0 border-b border-gray-200 bg-white shadow-sm">
            <div className="flex min-w-full flex-none gap-x-6 px-4 text-sm text-gray-400 sm:px-6">
                <div className="flex w-full justify-between items-center">
                    {/* Sidebar toggle */}
                    <SidebarToggle toggleHandler={toggleHandler} />

                    {/* Toolbar content */}
                    <div className="flex-1 overflow-x-auto toolbar-scroll">
                        <div className="flex flex-nowrap">
                            {items.map((item, index) => {
                                const className = toolbarStyles[item.styleLiteral];

                                const componentWithClass = React.cloneElement(
                                    item.component, { className }
                                );

                                return (
                                    <div key={index}>
                                        {componentWithClass}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Expander button */}
                    <div className="flex-shrink-0 px-2">
                        <PopoverButton>
                            <ChevronDoubleDownIcon
                                className={toolbarStyles.drawerButton}
                            />
                        </PopoverButton>
                    </div>
                </div>
            </div>

            <PopoverPanel
                transition
                className="absolute inset-x-0 top-full z-40 w-full shadow-lg ring-1 ring-gray-900/5 transition-transform duration-200 ease-out"
            >
                {/* Drawer's content */}
                <div className="bg-white mx-auto max-w-7xl px-6 py-6 sm:py-10 lg:px-8">
                    <QuoteDrawer />
                </div>

                <div className="bg-gray-50">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 divide-y divide-gray-900/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-x sm:border-gray-900/5">
                            {/* Calls to action... */}
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    );
}
