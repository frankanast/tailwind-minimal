// This is an implementation of AbstractSecondaryToolbar for QuoteConfigurator.
// It takes a setter method as a prop, while each functionality is included in the component file
// (we don't want this to be reusable).
// The dataset contains row data from an AG grid that needs to be manipulated.

import AbstractSecondaryToolbar from "../abstract/toolbars/AbstractSecondaryToolbar.jsx";
import {
    EyeIcon, LockClosedIcon, PencilIcon, PercentBadgeIcon,
} from '@heroicons/react/20/solid'
import {SparklesIcon, Square2StackIcon} from "@heroicons/react/24/outline";
import FxIcon from "../../assets/FxIcon.jsx";
import {useRatePresenterContext} from "./RatePresenterContext.jsx";
import SelectAllIcon from "../../assets/SelectAllIcon.jsx";
import InvertSelectionIcon from "../../assets/InvertSelectionIcon.jsx";

export default function QuoteSecondaryToolbar() {
    const {selectAll, clearSelection, selectInverse} = useRatePresenterContext()

    const items = [
        { name: 'Standard', href: '#', current: false },
        { name: 'Tailored', href: '#', current: false },
    ]

    const actions = [
        { name: 'Select all', href: '#', icon: <SelectAllIcon />, handler: selectAll },
        { name: 'Clear selection', href: '#', icon: <Square2StackIcon />, handler: clearSelection },
        { name: 'Select inverse', href: '#', icon: <InvertSelectionIcon />, handler: selectInverse },

        { name: 'Show/Hide', href: '#', icon: <EyeIcon />, handler: () => {alert("Show")} },
        { name: 'Lock/Unlock', href: '#', icon: <LockClosedIcon />, handler: () => {alert("Lock")} },
        { name: 'Discount', href: '#', icon: <PercentBadgeIcon />, handler: () => {alert("Discount")} },
        { name: 'Formula', href: '#', icon: <FxIcon />, handler: () => {alert("Formula")} },
        { name: 'Set an alias', href: '#', icon: <PencilIcon />, handler: () => {alert("Set")} },
        { name: 'Format values', href: '#', icon: <SparklesIcon />, handler: () => {alert("Format")} },
    ]

    const selection = [
        { name: 'Select all', href: '#', icon: <Square2StackIcon />, handler: selectAll },
        { name: 'Clear selection', href: '#', icon: <Square2StackIcon />, handler: () => {alert("Clear selection")}},
        { name: 'Select inverse', href: '#', icon: <Square2StackIcon />, handler: () => {alert("Select inverse")}},
    ]

    return (
        <AbstractSecondaryToolbar items={items} actions={actions} />
    )
}
