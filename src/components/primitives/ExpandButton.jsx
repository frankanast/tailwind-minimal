import 'react'
import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid/index.js";

export default function ExpandButton() {
    return (
        <button
            type="button"
            className="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            <ChevronDoubleDownIcon aria-hidden="true" className="h-5 w-5" />
        </button>
    )
}