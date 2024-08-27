// DateRangeInput.jsx
// Two input fields for check-in and check-out dates, customized.

import {
    ArrowLeftEndOnRectangleIcon,
    ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline'

export default function DateRangeInput() {
    return (
        <div className="px-60">
            <label htmlFor="checkin-date" className="block text-sm font-medium leading-6 text-gray-900">
                Find rates
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">

                {/* Check-in Date */}
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <ArrowLeftEndOnRectangleIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="checkin-date"
                        name="checkin-date"
                        type="date"
                        placeholder="Check-out"
                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none"
                    />
                </div>

                {/* Check-out Date */}
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <input
                        id="checkout-date"
                        name="checkout-date"
                        type="date"
                        placeholder="Check-in"
                        className="block w-full rounded-none rounded-r-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ArrowRightEndOnRectangleIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>
        </div>
    )
}
