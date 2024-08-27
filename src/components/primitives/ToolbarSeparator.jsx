import 'react'

export default function ToolbarSeparator() {
    return (
        <div className="flex items-center mx-4 gap-x-4 lg:gap-x-6">
            <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"/>
        </div>
    )
}