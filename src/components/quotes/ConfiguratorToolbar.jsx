// This is an implementation of AbstractSecondaryToolbar for QuoteConfigurator.
// It takes a setter method as a prop, while each functionality is included in the component file
// (we don't want this to be reusable).
// The dataset contains row data from an AG grid that needs to be manipulated.

import AbstractSecondaryToolbar from "../abstract/toolbars/AbstractSecondaryToolbar.jsx";
import {
    BoltIcon,
    CursorArrowRaysIcon,
    SparklesIcon,
    DocumentCurrencyEuroIcon,
    DocumentCurrencyDollarIcon,
    ArrowUturnLeftIcon,
    BackspaceIcon,
    ScissorsIcon,
    QueueListIcon,
    DocumentIcon,
} from '@heroicons/react/20/solid'

import {Square2StackIcon} from "@heroicons/react/24/outline";
import FxIcon from "../../assets/FxIcon.jsx";
import {useRatePresenterContext} from "./RatePresenterContext.jsx";
import SelectAllIcon from "../../assets/SelectAllIcon.jsx";
import InvertSelectionIcon from "../../assets/InvertSelectionIcon.jsx";
import InvertEverythingIcon from "../../assets/InvertEverythingIcon.jsx";
import SelectNothingIcon from "../../assets/SelectNothingIcon.jsx";
import SelectEverythingIcon from "../../assets/SelectEverythingIcon.jsx";
import FormulaDialog from "./FormulaDialog.jsx";
import {FormulaEditorProvider} from "./FormulaEditorContext.jsx";

export default function ConfiguratorToolbar() {
    const {
        updateSelection,
        formulaDialogIsOpen,
        setFormulaDialogIsOpen,
        applyFormula,
        applyNetRateItaly,
        applyNetRateWorld,
        restore,
        deleteSelectedEntities,
    } = useRatePresenterContext();

    const handleOpenFormulaDialog = () => {
        setFormulaDialogIsOpen(true);
    };

    const handleCloseFormulaDialog = () => {
        setFormulaDialogIsOpen(false);
    };

    const handleFormulaSubmit = () => {
        applyFormula()
        setFormulaDialogIsOpen(false);
    }

    const handleRestore = () => {
        restore()
    }

    const handleNetRateItaly = () => {
        applyNetRateItaly()
    }

    const handleNetRateWorld = () => {
        applyNetRateWorld()
    }

    const handleDelete = () => {
        deleteSelectedEntities()
    }

    const toolbarItems = [
        {
            title: 'Modes',
            icon: <DocumentIcon />,
            items: [
                [
                    { name: 'Standard', href: '#', icon: <QueueListIcon />, shortcutLabel: "", handler: () => {alert("Standard")} },
                    { name: 'Tailored', href: '#', icon: <ScissorsIcon />, shortcutLabel: "", handler: () => {alert("Tailored")} },
                ],
            ]
        },
        {
            title: 'Actions',
            icon: <BoltIcon />,
            items: [
                [
                    { name: 'Formula...', href: '#', icon: <FxIcon />, shortcutLabel: "F", handler: handleOpenFormulaDialog },
                    { name: 'Net rate (world)', href: '#', icon: <DocumentCurrencyDollarIcon />, shortcutLabel: "", handler: handleNetRateWorld },
                    { name: 'Net rate (Italia)', href: '#', icon: <DocumentCurrencyEuroIcon />, shortcutLabel: "", handler: handleNetRateItaly },
                ],
                [
                    { name: 'Delete', href: '#', icon: <BackspaceIcon />, shortcutLabel: "⌂", handler: handleDelete },
                    { name: 'Format...', href: '#', icon: <SparklesIcon />, shortcutLabel: "", handler: () => {alert("Format")} },
                ],
                [
                    { name: 'Restore', href: '#', icon: <ArrowUturnLeftIcon />, shortcutLabel: "", handler: handleRestore },
                ]
            ]
        },
        {
            title: 'Selection',
            icon: <CursorArrowRaysIcon />,
            items: [
                [
                    { name: 'Select all', href: '#', icon: <SelectAllIcon />, shortcutLabel: "A", handler: () => {updateSelection('all')} },
                    { name: 'Clear selection', href: '#', icon: <Square2StackIcon />, shortcutLabel: "Esc", handler: () => {updateSelection('none')} },
                    { name: 'Invert selection', href: '#', icon: <InvertSelectionIcon />, shortcutLabel: "I", handler: () => {updateSelection('inverse')} },
                ],
                [
                    { name: 'Select everything', href: '#', icon: <SelectEverythingIcon />, shortcutLabel: "⇧A", handler: () => {updateSelection('everything')} },
                    { name: 'Select nothing', href: '#', icon: <SelectNothingIcon />, shortcutLabel: "⇧Esc", handler: () => {updateSelection('nothing')} },
                    { name: 'Invert everything', href: '#', icon: <InvertEverythingIcon />, shortcutLabel: "⇧I", handler: () => {updateSelection('inverseEverything')} },
                ]
            ]
        }
    ]

    return (
        <>
            <AbstractSecondaryToolbar actions={toolbarItems}/>
            <FormulaEditorProvider>
                {formulaDialogIsOpen && (
                    <FormulaDialog />
                )}
            </FormulaEditorProvider>
        </>

    )
}
