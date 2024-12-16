import 'react'
import {Menu, MenuButton} from '@headlessui/react'
import {EllipsisVerticalIcon, HomeIcon, ClipboardIcon, ClipboardDocumentListIcon, ScissorsIcon} from '@heroicons/react/20/solid'

import classNames from "../../utils/classNames.js";
import ActionMenu from "../abstract/ActionMenu.jsx";
import {nanoid} from "nanoid";

const statuses = {
    Complete: 'text-green-700 bg-green-50 ring-green-600/20',
    'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}
const templatesPageLegacy = [
    {
        id: 1,
        name: 'Offer of Stay (Resort)',
        href: '#',
        status: 'Public',
        createdBy: 'Francesco Anastasio',
        dueDate: 'March 17, 2023',
        dueDateTime: '2023-03-17T00:00Z',
    },
    {
        id: 2,
        name: 'New benefits plan',
        href: '#',
        status: 'In progress',
        createdBy: 'Leslie Alexander',
        dueDate: 'May 5, 2023',
        dueDateTime: '2023-05-05T00:00Z',
    },
    {
        id: 3,
        name: 'Onboarding emails',
        href: '#',
        status: 'In progress',
        createdBy: 'Courtney Henry',
        dueDate: 'May 25, 2023',
        dueDateTime: '2023-05-25T00:00Z',
    },
    {
        id: 4,
        name: 'iOS app',
        href: '#',
        status: 'In progress',
        createdBy: 'Leonard Krasner',
        dueDate: 'June 7, 2023',
        dueDateTime: '2023-06-07T00:00Z',
    },
    {
        id: 5,
        name: 'Marketing site redesign',
        href: '#',
        status: 'Archived',
        createdBy: 'Courtney Henry',
        dueDate: 'June 10, 2023',
        dueDateTime: '2023-06-10T00:00Z',
    }

]

// Breadcrumbs mockup
const pages = [
    { name: 'Templates', href: '#', current: false },
    { name: 'Offer of Stay (Resort)', href: '#', current: true },
]

const actions = [
    {id: nanoid(), name: "copy", icon: <ClipboardIcon />, text: "Copy"},
    {id: nanoid(), name: "cut", icon: <ScissorsIcon />, text: "Cut"},
    {id: nanoid(), name: "paste", icon: <ClipboardDocumentListIcon />, text: "Paste"},
]

function TemplateToolbar() {
    return (
        <div
            className="sticky flex top-0 z-40 h-16 shrink-0 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8"
        >

            <nav aria-label="Template creation steps" className="flex overflow-x-auto w-full py-4">
                <ol
                    role="list"
                    className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                >
                    <li className="flex">
                        <div className="flex items-center">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
                                <span className="sr-only">Home</span>
                            </a>
                        </div>
                    </li>
                    {pages.map((page) => (
                        <li key={page.name} className="flex">
                            <div className="flex items-center">
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 24 44"
                                    preserveAspectRatio="none"
                                    aria-hidden="true"
                                    className="h-full w-6 flex-shrink-0 text-gray-200"
                                >
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <a
                                    href={page.href}
                                    aria-current={page.current ? 'page' : undefined}
                                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                >
                                    {page.name}
                                </a>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}

export default function Templates() {
     return (
        <div className="bg-white">
            <TemplateToolbar  />
            <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-12 space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div className="flex flex-col mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <div>

                        <ul role="list" className="divide-y divide-gray-100">
                            {templatesPageLegacy.map((project) => (
                                <li key={project.id} className="flex items-center justify-between gap-x-6 py-5">
                                    <div className="min-w-0">
                                        <div className="flex items-start gap-x-3">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
                                            <p
                                                className={classNames(
                                                    statuses[project.status],
                                                    'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                                )}
                                            >
                                                {project.status}
                                            </p>
                                        </div>
                                        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                            <p className="whitespace-nowrap">
                                                Due on <time dateTime={project.dueDateTime}>{project.dueDate}</time>
                                            </p>
                                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                                <circle r={1} cx={1} cy={1}/>
                                            </svg>
                                            <p className="truncate">Created by {project.createdBy}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-none items-center gap-x-4">
                                        <a
                                            href={project.href}
                                            className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                        >
                                            View project<span className="sr-only">, {project.name}</span>
                                        </a>

                                        <Menu as="div" className="relative flex-none">
                                            <MenuButton
                                                className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                                <span className="sr-only">Open options</span>
                                                <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5"/>
                                            </MenuButton>
                                            <ActionMenu actions={actions} />
                                        </Menu>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
     )
}
