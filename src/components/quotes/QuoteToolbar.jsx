import { useState, useEffect } from "react";
import AbstractToolbar from "../abstract/toolbars/AbstractToolbar.jsx";
import { UserGroupIcon, RectangleGroupIcon } from "@heroicons/react/24/outline/index.js";
import { useQuoteContext } from "./QuoteContext.jsx";
import InputMask from 'react-input-mask';
import autocompleteStayDate from "../../utils/autocompleteStayDate.js";
import toolbarStyles from "../abstract/toolbars/toolbarStyles.js";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid/index.js";
import formatShortDate from "../../utils/formatDateShort.js"

export default function QuoteToolbar({ toggleHandler, drawerItem }) {
    const { occupancy, checkInDate, setCheckInDate, checkOutDate, setCheckOutDate } = useQuoteContext();

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
            styleLiteral: "iconButtonMiddle"
        },
        {
            component:
                <div>
                    <div className={toolbarStyles.iconButton}>
                        <RectangleGroupIcon />{occupancy.length || "0"}
                    </div>
                </div>,
            styleLiteral: "iconButtonMiddle"
        },
        { component:
                <button>
                    <MagnifyingGlassIcon className="w-5"/>
                    Load
                </button>,
            styleLiteral: "buttonRight",
            handler: () => {}
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
