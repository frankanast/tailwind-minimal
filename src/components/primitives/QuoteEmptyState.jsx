import 'react'

export default function QuoteEmptyState(counter) {
    // Counter is an external reference, at each render it should increment by 1.
    // This way, we can distinguish whether the user has just opened the app OR there are no rooms available to show.

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
                    d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
            </svg>

            <h3 className="mt-2 text-sm font-semibold text-gray-900">No rooms available</h3>
            <p className="mt-1 text-sm text-gray-500">
                It looks like we are at capacity.<br/>
                Please double check in your PMS system.
            </p>
        </div>
    )
}
