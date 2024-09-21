import 'react'

export default function Topbar({ contentLeft, contentCenter, contentRight, expander }) {
    return (
        <div
            className="sticky flex top-0 z-40 h-16 shrink-0 justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
            {/* Left side content */}
            <div className="flex items-center">
                {contentLeft}
            </div>

            {/* Center section */}
            <div className="flex justify-center">
                {contentCenter}
            </div>

            {/* Right section */}
            <div className="flex items-center">
                {contentRight}
            </div>
            {expander && <ExpandButton />}
        </div>
    );
}
