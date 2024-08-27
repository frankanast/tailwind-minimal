'use client'

import { FaceSmileIcon, PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

export default function MessageInput() {
    return (
        <div className="flex w-full px-7 gap-4 items-center align-middle">
            <input
                id="name"
                name="name"
                type="text"
                placeholder="Type your message..."
                className="flex-1 w-full rounded-full border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <button
                type="button"
                className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
            >
                <PaperClipIcon aria-hidden="true" className="h-6 w-6"/>
                <span className="sr-only">Attach a file</span>
            </button>

            <button
                type="button"
                className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
            >
                <FaceSmileIcon aria-hidden="true" className="h-6 w-6"/>
                <span className="sr-only">Add an emoji</span>
            </button>

            <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <PaperAirplaneIcon aria-hidden="true" className="h-6 w-6"/>
                <span className="sr-only">Send your message</span>
            </button>

        </div>
    )
}
