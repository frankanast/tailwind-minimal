import { useState, useRef } from "react";
import DateRangeInput from "./primitives/DateRangeInput.jsx";
import DateRangePopover from "./primitives/DateRangePopover.jsx";

export default function DateRangePicker() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

    const inputRef = useRef(null); // Reference for positioning

    // Handle focus for both inputs
    const handleFocus = () => {
        if (!isPopoverOpen) {
            setIsPopoverOpen(true);
        }
    };

    // Handle date change from popover or input fields
    const handleDateChange = (startDate, endDate) => {
        setDateRange({ startDate, endDate });
    };

    // Handle blur for both inputs, close popover when focus is lost
    const handleBlur = (e) => {
        // Close popover only if focus moves away from both inputs
        if (!inputRef.current.contains(e.relatedTarget)) {
            setIsPopoverOpen(false);
        }
    };

    return (
        <div className="relative w-full justify-center items-center">
            {/* The DateRangeInput component */}
            <div
                ref={inputRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                tabIndex={-1} // Allow this div to capture focus and blur events
            >
                {/*
                <DateRangeInput
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    onDateChange={handleDateChange}
                />
                */}
                <DateRangeInput />

            </div>

            {/* Popover positioned above and centered with respect to DateRangeInput */}
            {isPopoverOpen && (
                <div className="absolute z-10 w-full flex justify-center items-center my-2">
                    <div className="w-auto">
                        {/*
                        <DateRangePopover
                            startDate={dateRange.startDate}
                            endDate={dateRange.endDate}
                            onDateChange={handleDateChange}
                            closePopover={() => setIsPopoverOpen(false)}
                        />
                        */}
                        <DateRangePopover />
                    </div>
                </div>
            )}
        </div>
    );
}
