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
    { name: 'Show/Hide', href: '#', icon: <EyeIcon />, handler: () => {} },
    { name: 'Lock/Unlock', href: '#', icon: <LockClosedIcon />, handler: () => {} },
    { name: 'Discount', href: '#', icon: <PercentBadgeIcon />, handler: () => {} },
    { name: 'Formula', href: '#', icon: <BeakerIcon />, handler: () => {} },
    { name: 'Set an alias', href: '#', icon: <PencilIcon />, handler: () => {} },
    { name: 'Format values', href: '#', icon: <PaintBrushIcon />, handler: () => {} },
]

export default function QuoteSecondaryToolbar({dataHandler}) {
    return (
        <AbstractSecondaryToolbar items={items} actions={actions} />
    )
}
