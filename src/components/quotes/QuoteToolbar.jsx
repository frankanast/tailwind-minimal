import AbstractToolbar from "../abstract/toolbars/AbstractToolbar.jsx";
import InputMask from 'react-input-mask';
import { useState, useEffect } from "react";
import { useQuoteContext } from "../../context/QuoteContext.jsx";
import {
    UserGroupIcon,
    RectangleGroupIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/24/solid/index.js";
import toolbarStyles from "../abstract/toolbars/toolbarStyles.js";
import autocompleteStayDate from "../../utils/autocompleteStayDate.js";
import formatShortDate from "../../utils/formatDateShort.js"
import LoadingIcon from "../../assets/LoadingIcon.jsx";

export default function QuoteToolbar({drawerItem}) {
    const {
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        occupancy,
        totalPeople,
        isFetching,
        refetch,
    } = useQuoteContext();

    const [checkInInput, setCheckInInput] = useState(checkInDate ? formatShortDate(checkInDate) : "");
    const [checkOutInput, setCheckOutInput] = useState(checkOutDate ? formatShortDate(checkOutDate) : "");

    useEffect(() => {
        setCheckInInput(checkInDate ? formatShortDate(checkInDate) : "");
    }, [checkInDate])

    useEffect(() => {
        setCheckOutInput(checkOutDate ? formatShortDate(checkOutDate) : "");
    }, [checkOutDate])

    const handleCheckInBlur = (event) => {
        const currentInput = event.target.value;
        const completedDate = autocompleteStayDate(currentInput);
        if (completedDate) {
            setCheckInDate(completedDate);
            setCheckInInput(formatShortDate(completedDate));
        }
    };

    const handleCheckOutBlur = (event) => {
        const currentInput = event.target.value;
        const completedDate = autocompleteStayDate(currentInput);
        if (completedDate) {
            setCheckOutDate(completedDate);
            setCheckOutInput(formatShortDate(completedDate));
        }
    };

    const handleFetchClick = () => {
        refetch()
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
                    onChange={(e) => setCheckInInput(e.target.value)}
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
                    onChange={(e) => setCheckOutInput(e.target.value)}
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
        {
            component:
                <button onClick={handleFetchClick}>
                    {isFetching
                        ? <LoadingIcon className="w-4 my-auto"/>
                        : <MagnifyingGlassIcon className="w-4" />
                    }
                    Load
                </button>,
            styleLiteral: "inputGroupButton"
        },
    ];

    return (
        <>
            <AbstractToolbar
                items={toolbarItems}
                drawerItem={drawerItem}
            />
        </>
    );
}
