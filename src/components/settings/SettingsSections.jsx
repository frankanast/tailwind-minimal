import classNames from "../../utils/classNames.js";
import {
    RectangleGroupIcon,
    CurrencyEuroIcon,
} from '@heroicons/react/24/outline'
import {NavLink} from "react-router-dom";

const sections = [
    {
        title: 'Rooms',
        to: "rooms",
        description: 'Category mapping with website data.',
        icon: RectangleGroupIcon,
        background: 'bg-indigo-500',
    },
    {
        title: 'Rates',
        to: "rates",
        description: 'Rate mapping with website data.',
        icon: CurrencyEuroIcon,
        background: 'bg-indigo-500',
    },
]

export default function SettingsSections() {
    return (
        <div className="px-52">
            <h2 className="text-base font-semibold text-gray-900">Settings</h2>
            <p className="mt-1 text-sm text-gray-500">
                Configure Programmino to best suit your team&apos;s needs. All modifications are global (for all
                users).
            </p>
            <ul role="list"
                className="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-200 py-6 sm:grid-cols-2">
                {sections.map((item, itemIdx) => (
                    <li key={itemIdx} className="flow-root">

                        <div
                            className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
                            <div
                                className={classNames(item.background, 'flex size-16 shrink-0 items-center justify-center rounded-lg')}
                            >
                                <item.icon aria-hidden="true" className="size-6 text-white"/>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                    <NavLink
                                        to={item.to}
                                        className="focus:outline-none"
                                        viewTransition
                                    >
                                        <span aria-hidden="true" className="absolute inset-0"/>
                                        <span>{item.title}</span>
                                        <span aria-hidden="true"> &rarr;</span>
                                    </NavLink>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    )
}