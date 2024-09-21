import 'react'

// TODO : To test if this works with the new toolbar as well

export default function ToolbarSeparator() {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="h-full w-6 flex-shrink-0 text-gray-200"
        >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z"/>
        </svg>
    )
}