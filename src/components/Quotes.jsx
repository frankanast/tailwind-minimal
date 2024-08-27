import TopBar from "./primitives/TopBar.jsx";
import QuoteInitialState from "./primitives/QuoteInitialState.jsx";
import ToolbarSeparator from "./primitives/ToolbarSeparator.jsx";
import DateRangePicker from "./DateRangePicker.jsx";
import TopbarDrawer from "./primitives/TopbarDrawer.jsx";
import {PhoneIcon, PlayCircleIcon, RectangleGroupIcon} from "@heroicons/react/20/solid/index.js";

const quoteCallsToAction = [
    { name: 'Dates and rooms', href: '#', icon: PlayCircleIcon },
    { name: 'Details', href: '#', icon: PhoneIcon },
    { name: 'Load rates', href: '#', icon: RectangleGroupIcon },
]

function QuoteDateFields() {
    // TopbarDrawer requires an empty element (<></>) as content for the topbar.

    return (
        <>
            <input
                type="text"
                id="check-in"
                name="check-in"
                autoComplete="off"
                className="flex-1 border-0 py-0 px-2 text-center text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:placeholder-transparent sm:text-sm"
                placeholder="Check-in"
            />

            <ToolbarSeparator />

            <input
                type="text"
                id="check-out"
                name="check-out"
                autoComplete="off"
                className="flex-1 border-0 py-0 px-2 text-center text-gray-900 placeholder:text-gray-400 focus:placeholder-transparent focus:ring-0 sm:text-sm"
                placeholder="Check-out"
            />
        </>
    );
}

export default function Quotes() {
    return (
        <div>
            {/*<TopBar contentCenter={<QueryInputToolbar/>}/>*/}
            <TopbarDrawer
                barContent={<QuoteDateFields/>}
                drawerContent={<span>Hello, world</span>}
                callsToAction={quoteCallsToAction}
            />

            <div className="h-full flex flex-col flex-grow-1 p-7">
                <QuoteInitialState />
            </div>

        </div>
    )
}