// This is an implementation of AbstractSecondaryToolbar for QuoteConfigurator.
// It takes a setter method as a prop, while each functionality is included in the component file
// (we don't want this to be reusable).
// The dataset contains row data from an AG grid that needs to be manipulated.

import AbstractSecondaryToolbar from "../abstract/toolbars/AbstractSecondaryToolbar.jsx";
import {
    BeakerIcon, EyeIcon, LockClosedIcon, PaintBrushIcon, PencilIcon, PercentBadgeIcon,
} from '@heroicons/react/20/solid'

const items = [
    { name: 'Standard', href: '#', current: false },
    { name: 'Tailored', href: '#', current: false },
]

const actions = [
    { name: 'Show/Hide', href: '#', icon: <EyeIcon />, handler: () => {alert("Show")} },
    { name: 'Lock/Unlock', href: '#', icon: <LockClosedIcon />, handler: () => {alert("Lock")} },
    { name: 'Discount', href: '#', icon: <PercentBadgeIcon />, handler: () => {alert("Discount")} },
    { name: 'Formula', href: '#', icon: <BeakerIcon />, handler: () => {alert("Formula")} },
    { name: 'Set an alias', href: '#', icon: <PencilIcon />, handler: () => {alert("Set")} },
    { name: 'Format values', href: '#', icon: <PaintBrushIcon />, handler: () => {alert("Format")} },
]

export default function QuoteSecondaryToolbar({dataHandler}) {
    return (
        <AbstractSecondaryToolbar items={items} actions={actions} />
    )
}
