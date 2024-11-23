import { useQuoteContext } from '../../context/QuoteContext.jsx';
import AbstractCalendar from '../abstract/AbstractCalendar.jsx';

export default function QuoteDatePicker() {
    const { checkInDate, checkOutDate, setCheckInDate, setCheckOutDate } = useQuoteContext();

    const handleDateClick = (date) => {
        if (!checkInDate || (checkInDate && checkOutDate)) {
            setCheckInDate(date);
            setCheckOutDate(null);
        } else {
            if (date < checkInDate) {
                setCheckOutDate(checkInDate);
                setCheckInDate(date);
            } else {
                setCheckOutDate(date);
            }
        }
    };

    return (
        <AbstractCalendar
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            clickHandler={handleDateClick}
        />
    );
}
