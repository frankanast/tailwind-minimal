import AbstractToolbar from "../abstract/toolbars/AbstractToolbar.jsx";
import {UserGroupIcon, RectangleGroupIcon} from "@heroicons/react/24/outline/index.js";

const toolbarItems = [
    {component: <input name="check-in" placeholder="Check-in"/>, styleLiteral: "inputGroupLeft"},
    {component: <input name="check-out" placeholder="Check-out" />, styleLiteral: "inputGroupRight"},
    {component: <UserGroupIcon />, styleLiteral: "iconButton"},
    {component: <div>1</div>, styleLiteral: "label"},
    {component: <RectangleGroupIcon />, styleLiteral: "iconButton"},
    {component: <div>2</div>, styleLiteral: "label"},
    {component: <button>Load</button>, styleLiteral: "solidButton", handler: () => {}},
]

// const quoteCallsToAction = [
//     { name: 'Dates & Rooms', href: '#', icon: PlayCircleIcon },
//     { name: 'Details', href: '#', icon: PhoneIcon },
//     { name: 'Load rates', href: '#', icon: RectangleGroupIcon },
// ]

export default function QuoteToolbar({ toggleHandler, loadHandler }) {
    return (
        <>
            <AbstractToolbar
                items={toolbarItems}
                toggleHandler={toggleHandler}
            />
        </>
    )
}