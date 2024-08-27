import 'react'
import ExpandButton from "./ExpandButton.jsx";

export default function TopBar({ contentLeft, contentCenter, expander }) {
    return (
        <div
            className="sticky flex top-0 z-40 h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
            <div className="flex items-center">
                {/* Left side content */}
            </div>

            {/* Center section (QueryInputToolbar) */}
            <div className="flex justify-center w-full self-stretch">
                {contentCenter}
            </div>

            {/* Right section */}
            <div className="flex items-center">
                {expander && <ExpandButton />}
            </div>
        </div>
    );
}
