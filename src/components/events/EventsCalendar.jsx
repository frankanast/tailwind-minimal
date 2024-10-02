import { useState } from 'react'
import AbstractCalendar from '../abstract/AbstractCalendar.jsx'

export default function EventsCalendar() {
    const [selectedRange, setSelectedRange] = useState([null, null]);

    // Handle date click and update selected range
    const handleDateClick = (date) => {
        if (!selectedRange[0] || (selectedRange[0] && selectedRange[1])) {
            setSelectedRange([date, null]);
        } else {
            setSelectedRange([selectedRange[0], date]);
        }
    };

    return (
        <AbstractCalendar
            checkInDate={selectedRange[0]}
            checkOutDate={selectedRange[1]}
            clickHandler={handleDateClick}
        />
    );
}
