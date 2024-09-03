import 'react'
import EventsCalendar from "./primitives/EventsCalendar.jsx";
import UpcomingEvents from "./primitives/UpcomingEvents.jsx";
import months from "./mockups/months.js";

export default function Events() {
    return (
        <div className="p-16">
            <EventsCalendar months={months} />
            <section className="mt-12">
                <UpcomingEvents />
            </section>
        </div>
    )
}
