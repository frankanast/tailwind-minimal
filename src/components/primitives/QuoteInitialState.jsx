import 'react'

export default function QuoteInitialState() {
    return (
        <div className="text-center">
            <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="mx-auto h-12 w-12 text-gray-400"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
            </svg>

            <h3 className="mt-2 text-sm font-semibold text-gray-900">No rooms to show</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by searching for new dates.</p>
        </div>
    )
}
