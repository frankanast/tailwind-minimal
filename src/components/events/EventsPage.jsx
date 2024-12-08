import 'react'
import EventsCalendar from "./EventsCalendar.jsx";
import UpcomingEvents from "./UpcomingEvents.jsx";

export default function EventsPage() {
    return (
        <div className="flex flex-col items-center p-16 max-w-6xl mx-auto">
            <EventsCalendar />
            <section className="mt-12 w-full overflow-x-auto">
                <UpcomingEvents />
            </section>
        </div>
    );
}
