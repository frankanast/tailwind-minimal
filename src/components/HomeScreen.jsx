'use client'
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Sidebar from './primitives/Sidebar.jsx';
import Quotes from "./Quotes.jsx";
import Messages from './Messages.jsx';
import Templates from './Templates.jsx';
import Help from './Help.jsx';
import Settings from './Settings.jsx';
import Events from './Events.jsx';
import SuperpowerUser from "./SuperpowerUser.jsx";
import SuperpowerBans from "./SuperpowerBans.jsx";
import SuperpowerSyslog from "./SuperpowerSyslog.jsx";
import SuperpowerNerdStuff from "./SuperpowerNerdStuff.jsx";

// Navigation items
const navigation = [
    { name: 'Quotes', component: Quotes, icon: 'CurrencyEuroIcon' },
    { name: 'Events', component: Events, icon: 'CalendarDaysIcon' },
    { name: 'Messages', component: Messages, icon: 'ChatBubbleOvalLeftIcon' },
    { name: 'Templates', component: Templates, icon: 'SparklesIcon' },
    { name: 'Help', component: Help, icon: 'QuestionMarkCircleIcon' },
    { name: 'Settings', component: Settings, icon: 'Cog6ToothIcon' },
];

// Superpowers items
const superpowers = [
    { name: 'Users', component: SuperpowerUser, initial: 'U' },
    { name: 'Bans', component: SuperpowerBans, initial: 'B' },
    { name: 'Syslog', component: SuperpowerSyslog, initial: 'L' },
    { name: 'Nerd stuff', component: SuperpowerNerdStuff, initial: 'N' },
];

export default function HomeScreen() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('Quotes');

    // Find the current component to render based on the selected page
    const CurrentComponent = navigation.find(item => item.name === currentPage)?.component
        || superpowers.find(item => item.name === currentPage)?.component;

    return (
        <>
            <div>
                {/* Mobile-specific button to open the sidebar */}
                <div className="lg:hidden p-4">
                    <button
                        type="button"
                        className="text-gray-700 hover:text-gray-900 focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Sidebar for mobile */}
                <Transition appear show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <div className="fixed inset-0 bg-gray-900/80" aria-hidden="true" />
                        <div className="fixed inset-0 flex">
                            <Dialog.Panel
                                className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out"
                            >
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button
                                            type="button"
                                            onClick={() => setSidebarOpen(false)}
                                            className="-m-2.5 p-2.5"
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                        </button>
                                    </div>
                                </Transition.Child>

                                {/* Sidebar content */}
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                    <Sidebar
                                        navigation={navigation}
                                        superpowers={superpowers}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        closeSidebar={() => setSidebarOpen(false)}
                                    />
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </Transition>

                {/* Sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <Sidebar
                        navigation={navigation}
                        superpowers={superpowers}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                <div className="lg:pl-72">
                    <main className="w-fill">
                        <div>
                            {/* Render current page content */}
                            {CurrentComponent && <CurrentComponent />}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
