'use client'

import { useState } from 'react';

import QuotePage from "./quotes/QuotePage.jsx";
import MessagesPage from './messages/MessagesPage.jsx';
import Templates from './templates/TemplatesPage.jsx';
import SupportPage from './help/SupportPage.jsx';
import SettingsPage from './settings/SettingsPage.jsx';
import EventsPage from "./events/EventsPage.jsx";

import Sidebar from "./Sidebar.jsx";

// Navigation items
const navigation = [
    { name: 'Quotes', page: QuotePage, icon: 'CurrencyEuroIcon' },
    { name: 'Events', page: EventsPage, icon: 'CalendarDaysIcon' },
    { name: 'Messages', page: MessagesPage, icon: 'ChatBubbleOvalLeftIcon' },
    { name: 'Templates', page: Templates, icon: 'SwatchIcon' },
    { name: 'Help', page: SupportPage, icon: 'QuestionMarkCircleIcon' },
    { name: 'Settings', page: SettingsPage, icon: 'Cog6ToothIcon' },
];

export default function HomeScreenLegacy() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [currentPage, setCurrentPage] = useState('Quotes');

    function toggleSidebar() {
        setSidebarOpen(prev => !prev);
    }

    const sidebarStyle = `transform transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'} flex-shrink-0`
    const CurrentPage = navigation.find(item => item.name === currentPage)?.page

    return (
        <>
            <div className="flex">
                <div
                    className={sidebarStyle}
                >
                    <Sidebar
                        navigation={navigation}
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
