'use client'

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import {
    SparklesIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    CalendarDaysIcon,
    CurrencyEuroIcon,
    ChatBubbleOvalLeftIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

// Section components
import Events from "./Events.jsx";
import Help from "./Help.jsx";
import Messages from "./Messages.jsx";
import Quotes from "./Quotes.jsx";
import Settings from "./Settings.jsx";
import Templates from "./Templates.jsx";
import SuperpowerUser from "./SuperpowerUser.jsx";
import SuperpowerSyslog from "./SuperpowerSyslog.jsx";
import SuperpowersBans from "./SuperpowerBans.jsx";
import SuperpowerNerdStuff from "./SuperpowerNerdStuff.jsx";

// Other components
import classNames from "../utils/classNames.js";
import CustomerLogoImg from "./CustomerLogoImg.jsx";
import ProfileSettingsDropdown from "./primitives/ProfileSettingsDropdown.jsx";

// TODO: Mockups
import userData from "./mockups/userData.js";
import logoData from "./mockups/logoData.js";

// Navigation items
const navigation = [
    { name: 'Quotes', component: Quotes, icon: CurrencyEuroIcon },
    { name: 'Events', component: Events, icon: CalendarDaysIcon },
    { name: 'Messages', component: Messages, icon: ChatBubbleOvalLeftIcon },
    { name: 'Templates', component: Templates, icon: SparklesIcon },
    { name: 'Help', component: Help, icon: QuestionMarkCircleIcon },
    { name: 'Settings', component: Settings, icon: Cog6ToothIcon },
];

// Superpowers items
const superpowers = [
    { name: 'Users', component: SuperpowerUser, initial: 'U' },
    { name: 'Bans', component: SuperpowersBans, initial: 'B' },
    { name: 'Syslog', component: SuperpowerSyslog, initial: 'L' },
    { name: 'Nerd stuff', component: SuperpowerNerdStuff, initial: '🤓'}
];

export default function HomeScreen() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState('Quotes');

    // Find the current component to render based on the selected page
    const CurrentComponent = navigation.find(item => item.name === currentPage)?.component
        || superpowers.find(item => item.name === currentPage)?.component;

    // Handle sidebar navigation clicks
    const handleNavigationClick = (e, name) => {
        e.preventDefault(); // Prevent default anchor behavior
        setCurrentPage(name); // Update state to selected page
    };


    return (
        <>
            <div>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>

                            {/* Sidebar component, mobile */}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center">
                                    <CustomerLogoImg prop={logoData}/>
                                </div>

                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            href="#"
                                                            onClick={(e) => handleNavigationClick(e, item.name)}
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-gray-50 text-indigo-600'
                                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                                    'h-6 w-6 shrink-0',
                                                                )}
                                                            />
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li>
                                            <div className="text-xs font-semibold leading-6 text-gray-400">Your teams
                                            </div>
                                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                {superpowers.map((section) => (
                                                    <li key={section.name}>
                                                        <a
                                                            href="#"
                                                            onClick={(e) => handleNavigationClick(e, section.name)}
                                                            className={classNames(
                                                                section.name === currentPage
                                                                    ? 'bg-gray-50 text-indigo-600'
                                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                            )}
                                                        >
                              <span
                                  className={classNames(
                                      section.current
                                          ? 'border-indigo-600 text-indigo-600'
                                          : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                                  )}
                              >
                                {section.initial}
                              </span>
                                                            <span className="truncate">{section.name}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li className="-mx-6 mt-auto">
                                            <ProfileSettingsDropdown data={userData}/>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Sidebar component, desktop (static) */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div
                        className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">

                        <div className="flex h-16 shrink-0 items-center">
                            <CustomerLogoImg prop={logoData} />
                        </div>

                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => handleNavigationClick(e, item.name)}
                                                    className={classNames(
                                                        item.name === currentPage
                                                            ? 'bg-gray-50 text-indigo-600'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                            'h-6 w-6 shrink-0',
                                                        )}
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    <div className="text-xs font-semibold leading-6 text-gray-400">Superpowers</div>
                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                        {superpowers.map((team) => (
                                            <li key={team.name}>
                                                <a
                                                    href="#"
                                                    onClick={(e) => handleNavigationClick(e, team.name)}
                                                    className={classNames(
                                                        team.name === currentPage
                                                            ? 'bg-gray-50 text-indigo-600'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                    )}
                                                >
                          <span
                              className={classNames(
                                  team.current
                                      ? 'border-indigo-600 text-indigo-600'
                                      : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
                              )}
                          >
                            {team.initial}
                          </span>
                                                    <span className="truncate">{team.name}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <ProfileSettingsDropdown variant="desktop" data={userData}/>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <main className="w-fill">
                        <div>
                            {/* Your content */}
                            {CurrentComponent && <CurrentComponent />}

                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
