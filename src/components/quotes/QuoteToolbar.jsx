import AbstractToolbar from "../abstract/toolbars/AbstractToolbar.jsx";
import IconWithBadge from "../abstract/IconWithBadge.jsx";
import {UserGroupIcon, RectangleGroupIcon} from "@heroicons/react/24/outline/index.js";
//import {PhoneIcon, PlayCircleIcon, RectangleGroupIcon} from "@heroicons/react/20/solid/index.js";

const toolbarItems = [
    {component: <input name="check-in" placeholder="Check-in"/>, styleLiteral: "inputGroupLeft"},
    {component: <input name="check-out" placeholder="Check-out" />, styleLiteral: "inputGroupRight"},
    {component: <IconWithBadge icon={UserGroupIcon} total="99"/>, styleLiteral: "none"},
    {component: <IconWithBadge icon={RectangleGroupIcon} total="99"/>, styleLiteral: "none"},
]

// const quoteCallsToAction = [
//     { name: 'Dates and rooms', href: '#', icon: PlayCircleIcon },
//     { name: 'Details', href: '#', icon: PhoneIcon },
//     { name: 'Load rates', href: '#', icon: RectangleGroupIcon },
// ]

export default function QuoteToolbar({ dates, setDates, occupancy, setOccupancy, toggleHandler }) {
    return (
        <>
            <AbstractToolbar
                items={toolbarItems}
                toggleHandler={toggleHandler}
            />
        </>
    )
}