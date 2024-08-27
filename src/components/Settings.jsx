'use client'
import 'react'
import TopBar from "./primitives/TopBar.jsx";

const secondaryNavigation = [
    { name: 'Account', href: '#', current: true },
    { name: 'Notifications', href: '#', current: false },
    { name: 'Billing', href: '#', current: false },
    { name: 'Teams', href: '#', current: false },
    { name: 'Integrations', href: '#', current: false },
]

function SettingsNavigation() {
    return (
        <nav className="flex overflow-x-auto py-4">
            <ul
                role="list"
                className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
            >
                {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                        <a href={item.href} className={item.current ? 'text-indigo-400' : ''}>
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default function Settings({ data }) {
    return (
        <>
            <div>
                <main>
                    <h1 className="sr-only">Settings</h1>

                    <TopBar contentCenter={<SettingsNavigation />}/>

                    <div className="mx-auto max-w-7xl pt-4 lg:flex lg:gap-x-16 lg:px-8">
                        <div className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
                            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>

                                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                        <div className="pt-6 sm:flex">
                                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full
                                                name
                                            </dt>
                                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                                <div className="text-gray-900">Tom Cook</div>
                                                <button type="button"
                                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                    Update
                                                </button>
                                            </dd>
                                        </div>
                                        <div className="pt-6 sm:flex">
                                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email
                                                address
                                            </dt>
                                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                                <div className="text-gray-900">tom.cook@example.com</div>
                                                <button type="button"
                                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                    Update
                                                </button>
                                            </dd>
                                        </div>
                                        <div className="pt-6 sm:flex">
                                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Title</dt>
                                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                                <div className="text-gray-900">Human Resources Manager</div>
                                                <button type="button"
                                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                    Update
                                                </button>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Bank
                                        accounts</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-500">Connect bank accounts to
                                        your account.</p>

                                    <ul role="list"
                                        className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                        <li className="flex justify-between gap-x-6 py-6">
                                            <div className="font-medium text-gray-900">TD Canada Trust</div>
                                            <button type="button"
                                                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Update
                                            </button>
                                        </li>
                                        <li className="flex justify-between gap-x-6 py-6">
                                            <div className="font-medium text-gray-900">Royal Bank of Canada</div>
                                            <button type="button"
                                                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Update
                                            </button>
                                        </li>
                                    </ul>

                                    <div className="flex border-t border-gray-100 pt-6">
                                        <button type="button"
                                                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                            <span aria-hidden="true">+</span> Add another bank
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Integrations</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-500">Connect applications to your
                                        account.</p>

                                    <ul role="list"
                                        className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                        <li className="flex justify-between gap-x-6 py-6">
                                            <div className="font-medium text-gray-900">QuickBooks</div>
                                            <button type="button"
                                                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Update
                                            </button>
                                        </li>
                                    </ul>

                                    <div className="flex border-t border-gray-100 pt-6">
                                        <button type="button"
                                                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                            <span aria-hidden="true">+</span> Add another application
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Language and
                                        dates</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        Choose what language and date format to use throughout your account.
                                    </p>

                                    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                                        <div className="pt-6 sm:flex">
                                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Language</dt>
                                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                                <div className="text-gray-900">English</div>
                                                <button type="button"
                                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                    Update
                                                </button>
                                            </dd>
                                        </div>
                                        <div className="pt-6 sm:flex">
                                            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date
                                                format
                                            </dt>
                                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                                <div className="text-gray-900">DD-MM-YYYY</div>
                                                <button type="button"
                                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                    Update
                                                </button>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
)
}
