'use client';

import { useState } from 'react';

//TODO: We probably don't need this
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from '@headlessui/react';

import {
    Bars3Icon,
    XMarkIcon,
    CurrencyEuroIcon,
    Cog6ToothIcon,
    CalendarDaysIcon,
    ChatBubbleOvalLeftIcon,
    QuestionMarkCircleIcon,
    SwatchIcon
} from '@heroicons/react/24/outline';

import { NavLink, Outlet } from 'react-router-dom';
import CustomerLogoImg from "./abstract/CustomerLogoImg.jsx";

const navigation = [
    {
        name: 'Quote',
        to: '/quote',
        icon: CurrencyEuroIcon,
    },
    {
        name: 'Events',
        to: '/events',
        icon: CalendarDaysIcon,
    },
    {
        name: 'Messages',
        to: '/messages',
        icon: ChatBubbleOvalLeftIcon,
    },
    {
        name: 'Templates',
        to: '/templates',
        icon: SwatchIcon,
    },
    {
        name: 'Settings',
        to: '/settings',
        icon: Cog6ToothIcon,
    },
    {
        name: 'Support',
        to: '/support',
        icon: QuestionMarkCircleIcon,
    },
]

export default function HomeScreen() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div>
                <Dialog
                    open={sidebarOpen}
                    onClose={setSidebarOpen}
                    className='relative z-50 lg:hidden'
                >
                    <DialogBackdrop
                        transition
                        className='fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
                    />

                    <div className='fixed inset-0 flex'>
                        <DialogPanel
                            transition
                            className='relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full'
                        >
                            <TransitionChild>
                                <div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0'>
                                    <button
                                        type='button'
                                        onClick={() => setSidebarOpen(false)}
                                        className='-m-2.5 p-2.5'
                                    >
                                        <span className='sr-only'>Close sidebar</span>
                                        <XMarkIcon
                                            aria-hidden='true'
                                            className='size-6 text-white'
                                        />
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2'>
                                <div className="flex h-16 shrink-0 items-center">
                                    <CustomerLogoImg/>
                                </div>
                                <nav className='flex flex-1 flex-col'>
                                    <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                                        <li>
                                            <ul role='list' className='-mx-2 space-y-1'>
                                                {navigation.map(item => (
                                                    <li key={item.name}>
                                                        <NavLink
                                                            to={item.to}
                                                            className={({ isActive }) =>
                                                                isActive
                                                                    ? 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold bg-gray-50 text-indigo-600'
                                                                    : 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                                                            }
                                                            viewTransition
                                                        >
                                                            <item.icon className="size-6 shrink-0"/>
                                                            {item.name}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6'>
                        <div className="flex h-16 shrink-0 items-center">
                            <CustomerLogoImg/>
                        </div>
                        <nav className='flex flex-1 flex-col'>
                            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                                <li>
                                    <ul role='list' className='-mx-2 space-y-3'>
                                        {navigation.map(item => (
                                            <li key={item.name}>
                                                <NavLink
                                                    to={item.to}
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold bg-gray-50 text-indigo-600'
                                                            : 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                                                    }
                                                    viewTransition
                                                >

                                                    <item.icon className="size-6 shrink-0"/>
                                                    {item.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className='-mx-6 mt-auto'>
                                    <a
                                        href='#'
                                        className='flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50'
                                    >
                                        <img
                                            alt=''
                                            src='https://avatars.githubusercontent.com/u/82828758?v=4'
                                            className='size-8 rounded-full bg-gray-50'
                                        />
                                        <span className='sr-only'>Your profile</span>
                                        <span aria-hidden='true'>Francesco Anastasio</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className='sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
                    <button
                        type='button'
                        onClick={() => setSidebarOpen(true)}
                        className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
                    >
                        <span className='sr-only'>Open sidebar</span>
                        <Bars3Icon aria-hidden='true' className='size-6' />
                    </button>
                    <div className='flex-1 text-sm/6 font-semibold text-gray-900'>
                        Dashboard
                    </div>
                    <a href='#'>
                        <span className='sr-only'>Your profile</span>
                        <img
                            alt=''
                            src='https://avatars.githubusercontent.com/u/82828758?v=4'
                            className='size-8 rounded-full bg-gray-50'
                        />
                    </a>
                </div>

                <main className='lg:pl-72'>  {/* 72 for the sidebar space on lg viewport! */}
                    <div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}
