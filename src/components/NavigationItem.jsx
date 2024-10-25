import classNames from '/src/utils/classNames.js';

import {
    CurrencyEuroIcon,
    CalendarDaysIcon,
    ChatBubbleOvalLeftIcon,
    SparklesIcon,
    QuestionMarkCircleIcon,
    Cog6ToothIcon,
    SwatchIcon
} from '@heroicons/react/24/outline';

const icons = {
    CurrencyEuroIcon,
    CalendarDaysIcon,
    ChatBubbleOvalLeftIcon,
    SwatchIcon,
    QuestionMarkCircleIcon,
    Cog6ToothIcon,
    SparklesIcon, // Legacy
};

export default function NavigationItem({ name, icon, initial, active, onClick }) {
    const IconComponent = icon ? icons[icon] : null;

    return (
        <li>
            <a
                href="#"
                onClick={onClick}
                className={classNames(
                    active ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                )}
            >
                {IconComponent && (
                    <IconComponent
                        aria-hidden="true"
                        className={classNames(active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0')}
                    />
                )}
                {initial && (
                    <span
                        className={classNames(
                            active ? 'border-indigo-600 text-indigo-600' : 'border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600',
                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium'
                        )}
                    >
                        {initial}
                    </span>
                )}
                <span className="truncate">{name}</span>
            </a>
        </li>
    );
}
