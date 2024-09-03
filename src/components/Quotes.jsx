import QuoteInitialState from "./primitives/QuoteInitialState.jsx";
import ToolbarSeparator from "./primitives/ToolbarSeparator.jsx";
import TopbarDrawer from "./primitives/TopbarDrawer.jsx";
import {PhoneIcon, PlayCircleIcon, RectangleGroupIcon} from "@heroicons/react/20/solid/index.js";
import EventsCalendar from "./primitives/EventsCalendar.jsx";
import months from "./mockups/months.js";
import RoomSelector from "./RoomSelector.jsx";

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

function QuoteDrawer() {
    // 2-months calendar and a room selector in a 3-column grid layout

    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0 lg:grid-cols-3 lg:gap-4 xl:gap-8 w-full h-auto">
            <span className="col-span-2">
                <EventsCalendar months={months}/>
            </span>
            <div>
                <RoomSelector />
            </div>
        </div>
    )
}


export default function Quotes() {
    return (
        <div>
            {/*<Topbar contentCenter={<QueryInputToolbar/>}/>*/}
            <TopbarDrawer
                barContent={<QuoteDateFields/>}
                drawerContent={<QuoteDrawer />}
                callsToAction={quoteCallsToAction}
            />

            <div className="h-full flex flex-col flex-grow-1 p-7">
                <QuoteInitialState />
            </div>

        </div>
    )
}