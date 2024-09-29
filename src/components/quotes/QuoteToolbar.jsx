import AbstractToolbar from "../abstract/toolbars/AbstractToolbar.jsx";
import { UserGroupIcon, RectangleGroupIcon } from "@heroicons/react/24/outline/index.js";
import { useQuoteContext } from "./QuoteContext.jsx";
import InputMask from 'react-input-mask';
import {useContext, useState} from "react";
import autocompleteStayDate from "../../utils/autocompleteStayDate.js";

export default function QuoteToolbar({ toggleHandler }) {
    const { occupancy } = useQuoteContext();
    const { checkInDate, setCheckInDate } = useQuoteContext();
    const { checkOutDate, setCheckOutDate } = useQuoteContext();

    const totalPeople = occupancy.reduce(
        (acc, curr) => acc + Number(curr.adults) + Number(curr.children), 0
    );

    const handleCheckInBlur = (event) => {
        const currentInput = event.target.value;
        const completedText = autocompleteStayDate(currentInput);
        setCheckInDate(completedText);
    };

    const handleCheckOutBlur = (event) => {
        const currentInput = event.target.value;
        const completedText = autocompleteStayDate(currentInput);
        setCheckOutDate(completedText);
    };

    const toolbarItems = [
        {
            component: (
                <InputMask
                    name="check-in"
                    placeholder="Check-in"
                    autoComplete="off"
                    mask="99-99-99"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
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
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    onBlur={handleCheckOutBlur}
                />
            ),
            styleLiteral: "inputGroupRight",
        },
        { component: <UserGroupIcon />, styleLiteral: "iconButton" },
        { component: <div>{totalPeople}</div>, styleLiteral: "label" },
        { component: <RectangleGroupIcon />, styleLiteral: "iconButton" },
        { component: <div>{occupancy.length || "0"}</div>, styleLiteral: "label" },
        { component: <button>Load</button>, styleLiteral: "solidButton", handler: () => {} },
    ];

    return (
        <>
            <AbstractToolbar
                items={toolbarItems}
                toggleHandler={toggleHandler}
            />
        </>
    );
}
