import classNames from "../../../utils/classNames.js";

// TODO : At the moment this is not 'abstract' at all... but designed for Quotes (composition). We will make it reusable later.
const tabs = [
    { name: 'Standard', href: '#', current: false },
    { name: 'Tailored', href: '#', current: false },
]

export default function AbstractSecondaryToolbar() {
    return (
        <div>

            {/* Mobile-dedicated layout. */}
            <div className="sm:hidden">

                {/* Use an "onChange" listener to redirect the user to the selected tab URL/component. */}
                <select
                    id="tabs"
                    name="tabs"
                    defaultValue={tabs.find((tab) => tab.current)?.name || 'Standard'}

                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>

                {/*TODO: What about the action menu? Shall we use the same dropdown in both viewports? */}
                {/*
                <button className={secondaryToolbarStyles.someConsistentClass} otherAttributes><PencilIcon className={secondaryToolbarStyles.iconButton} /></button>
                */}
            </div>

            {/* Desktop-dedicated layout. */}
            <div className="hidden bg-indigo-100 sm:block">
                <nav className="flex space-x-4">
                    {tabs.map((tab) => (
                        <a
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                                tab.current ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:text-indigo-600',
                                'rounded-md px-3 py-2 text-sm font-medium',
                            )}
                        >
                            {tab.name}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    )
}
