import AbstractToolbar from "../abstract/toolbars/AbstractToolbar.jsx";
import InputMask from 'react-input-mask';
import { useState, useEffect } from "react";
import { useQuoteContext } from "./QuoteContext.jsx";
import {UserGroupIcon, RectangleGroupIcon, MagnifyingGlassIcon, ClockIcon} from "@heroicons/react/24/solid/index.js";
import toolbarStyles from "../abstract/toolbars/toolbarStyles.js";
import autocompleteStayDate from "../../utils/autocompleteStayDate.js";
import formatShortDate from "../../utils/formatDateShort.js"


export default function QuoteToolbar({ toggleHandler, drawerItem }) {
    const {
        occupancy,
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        loadRates,    // Get the mutation function from the context
        isLoading,    // Loading state
        isError       // Error state
    } = useQuoteContext();

    // Maintain separate states for raw string inputs
    const [checkInInput, setCheckInInput] = useState(checkInDate ? formatShortDate(checkInDate) : "");
    const [checkOutInput, setCheckOutInput] = useState(checkOutDate ? formatShortDate(checkOutDate) : "");

    // Sync the input field when checkInDate or checkOutDate changes
    useEffect(() => {
        setCheckInInput(checkInDate ? formatShortDate(checkInDate) : "");
    }, [checkInDate]);

    useEffect(() => {
        setCheckOutInput(checkOutDate ? formatShortDate(checkOutDate) : "");
    }, [checkOutDate]);

    const totalPeople = occupancy.reduce(
        (acc, curr) => acc + Number(curr.adults) + Number(curr.children), 0
    );

    const handleCheckInBlur = (event) => {
        const currentInput = event.target.value;
        const completedDate = autocompleteStayDate(currentInput);
        setCheckInDate(completedDate)
    };

    const handleCheckOutBlur = (event) => {
        const currentInput = event.target.value;
        const completedDate = autocompleteStayDate(currentInput);
        setCheckOutDate(completedDate)
    };

    function handleLoad() {
        loadRates({ checkInDate, checkOutDate, occupancy });
    }

    const toolbarItems = [
        {
            component: (
                <InputMask
                    name="check-in"
                    placeholder="Check-in"
                    autoComplete="off"
                    mask="99-99-99"
                    value={checkInInput}
                    onChange={(e) => setCheckInInput(e.target.value)} // Handle input as raw string
                    onBlur={handleCheckInBlur}
                />
            ),
            styleLiteral: "inputGroupLeft",
        },
        {
            component: (
                <InputMask
                    name="check-out"
                    placeholder="Check-out"
                    autoComplete="off"
                    mask="99-99-99"
                    value={checkOutInput}
                    onChange={(e) => setCheckOutInput(e.target.value)} // Handle input as raw string
                    onBlur={handleCheckOutBlur}
                />
            ),
            styleLiteral: "inputGroupMiddle",
        },
        {
            component:
                <div>
                    <div className={toolbarStyles.iconButton}>
                        <UserGroupIcon />{totalPeople}
                    </div>
                </div>,
            styleLiteral: "inputIconGroupMiddle"
        },
        {
            component:
                <div>
                    <div className={toolbarStyles.iconButton}>
                        <RectangleGroupIcon />{occupancy.length || "0"}
                    </div>
                </div>,
            styleLiteral: "inputIconGroupMiddle"
        },
        { component:
                <button onClick={handleLoad}>
                    {isLoading
                        ? <><ClockIcon className={"w-4 animate-spin"} /> Loading...</>
                        : <><MagnifyingGlassIcon className="w-4" /> Load</>}
                </button>,
            styleLiteral: "inputGroupButton"
        },
    ];

    return (
        <>
            <AbstractToolbar
                items={toolbarItems}
                drawerItem={drawerItem}
                toggleHandler={toggleHandler}
            />
        </>
    );
}
