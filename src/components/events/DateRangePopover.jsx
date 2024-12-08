import 'react'
import EventsPage from "./EventsPage.jsx";

export default function DateRangePopover() {
    return (
        <>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <EventsPage variant='compact' />
                </div>

            </div>
        </>
    )
}
