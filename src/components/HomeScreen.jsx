'use client'

import { useState } from 'react';

import QuotePage from "./quotes/QuotePage.jsx";
import Messages from './messages/Messages.jsx';
import Templates from './templates/Templates.jsx';
import Help from './help/Help.jsx';
import Settings from './settings/Settings.jsx';
import Events from "./events/Events.jsx";
import SuperpowerUser from "./users/SuperpowerUser.jsx";
import SuperpowerBans from "./bans/SuperpowerBans.jsx";
import SuperpowerSyslog from "./syslog/SuperpowerSyslog.jsx";
import SuperpowerNerdStuff from "./nerd/SuperpowerNerdStuff.jsx";

import Sidebar from "./Sidebar.jsx";

// Navigation items
const navigation = [
    { name: 'Quotes', page: QuotePage, icon: 'CurrencyEuroIcon' },
    { name: 'Events', page: Events, icon: 'CalendarDaysIcon' },
    { name: 'Messages', page: Messages, icon: 'ChatBubbleOvalLeftIcon' },
    { name: 'Templates', page: Templates, icon: 'SwatchIcon' },
    { name: 'Help', page: Help, icon: 'QuestionMarkCircleIcon' },
    { name: 'Settings', page: Settings, icon: 'Cog6ToothIcon' },
];

// Superpowers items
const superpowers = [
    { name: 'Users', page: SuperpowerUser, initial: 'U' },
    { name: 'Bans', page: SuperpowerBans, initial: 'B' },
    { name: 'Syslog', page: SuperpowerSyslog, initial: 'L' },
    { name: 'Nerd stuff', page: SuperpowerNerdStuff, initial: 'N' },
];

export default function HomeScreen() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState('Quotes');

    function toggleSidebar() {
        setSidebarOpen(prev => !prev);
    }

    const sidebarStyle = `transform transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'} flex-shrink-0`

    // Current component and toolbar based on the selected page
    const CurrentPage = navigation.find(item => item.name === currentPage)?.page
        || superpowers.find(item => item.name === currentPage)?.page;

    return (
        <>
            <div className="flex">
                <div
                    className={sidebarStyle}
                >
                    <Sidebar
                        navigation={navigation}
                        superpowers={superpowers}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        isOpen={sidebarOpen}
                    />
                </div>

                <div className="main-content flex-1">
                    <main>
                        <div>
                            {CurrentPage && <CurrentPage toggleHandler={toggleSidebar} />}

                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
