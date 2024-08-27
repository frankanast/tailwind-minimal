import 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function EventsCalendar({months}) {
    return (
        <div className="relative grid grid-cols-1 gap-x-6 md:grid-cols-2">
            <button
                type="button"
                className="absolute -left-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
            </button>
            <button
                type="button"
                className="absolute -right-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
            </button>
            {months.map((month, monthIdx) => (
                <section
                    key={monthIdx}
                    className={classNames(monthIdx === months.length - 1 && 'hidden md:block', 'text-center')}
                >
                    <h2 className="text-sm font-semibold text-gray-900">{month.name}</h2>
                    <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                        <div>S</div>
                    </div>
                    <div
                        className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                        {month.days.map((day, dayIdx) => (
                            <button
                                key={day.date}
                                type="button"
                                className={classNames(
                                    day.isCurrentMonth ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
                                    dayIdx === 0 && 'rounded-tl-lg',
                                    dayIdx === 6 && 'rounded-tr-lg',
                                    dayIdx === month.days.length - 7 && 'rounded-bl-lg',
                                    dayIdx === month.days.length - 1 && 'rounded-br-lg',
                                    'relative py-1.5 hover:bg-gray-100 focus:z-10',
                                )}
                            >
                                <time
                                    dateTime={day.date}
                                    className={classNames(
                                        day.isToday && 'bg-indigo-600 font-semibold text-white',
                                        'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                                    )}
                                >
                                    {day.date.split('-').pop().replace(/^0/, '')}
                                </time>
                            </button>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}