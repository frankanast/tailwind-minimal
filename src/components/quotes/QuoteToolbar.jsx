import AbstractToolbar from "../abstract/toolbars/AbstractToolbar.jsx";
import {UserGroupIcon, RectangleGroupIcon} from "@heroicons/react/24/outline/index.js";
import {useQuoteContext} from "./QuoteContext.jsx";

// const quoteCallsToAction = [
//     { name: 'Dates & Rooms', href: '#', icon: PlayCircleIcon },
//     { name: 'Details', href: '#', icon: PhoneIcon },
//     { name: 'Load rates', href: '#', icon: RectangleGroupIcon },
// ]

export default function QuoteToolbar({ toggleHandler }) {
    const { occupancy } = useQuoteContext();

    const totalPeople = occupancy.reduce(
        (acc, curr) => acc + Number(curr.adults) + Number(curr.children), 0
    );

    const toolbarItems = [
        {component: <input name="check-in" placeholder="Check-in"/>, styleLiteral: "inputGroupLeft"},
        {component: <input name="check-out" placeholder="Check-out" />, styleLiteral: "inputGroupRight"},
        {component: <UserGroupIcon />, styleLiteral: "iconButton"},
        {component: <div>{totalPeople}</div>, styleLiteral: "label"},
        {component: <RectangleGroupIcon />, styleLiteral: "iconButton"},
        {component: <div>{occupancy.length || "0"}</div>, styleLiteral: "label"},
        {component: <button>Load</button>, styleLiteral: "solidButton", handler: () => {}},
    ]

    return (
        <>
            <AbstractToolbar
                items={toolbarItems}
                toggleHandler={toggleHandler}
            />
        </>
    )
}