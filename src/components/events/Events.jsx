import 'react'
import EventsCalendar from "./EventsCalendar.jsx";
import UpcomingEvents from "./UpcomingEvents.jsx";
import months from "../../assets/mockups/months.js";

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
