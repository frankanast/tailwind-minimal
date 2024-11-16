// This is an implementation of AbstractSecondaryToolbar for QuoteStandardConfigurator.
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
import {useRatePresenterContext} from "./RatePresenterContext.jsx";
import {Square2StackIcon} from "@heroicons/react/24/outline";
import FxIcon from "../../assets/FxIcon.jsx";
import SelectAllIcon from "../../assets/SelectAllIcon.jsx";
import InvertSelectionIcon from "../../assets/InvertSelectionIcon.jsx";
import InvertEverythingIcon from "../../assets/InvertEverythingIcon.jsx";
import SelectNothingIcon from "../../assets/SelectNothingIcon.jsx";
import SelectEverythingIcon from "../../assets/SelectEverythingIcon.jsx";
import FormulaDialog from "./FormulaDialog.jsx";
import FormatDialog from "./FormatDialog.jsx";
import {FormulaDialogProvider} from "./FormulaDialogContext.jsx";
import {FormatDialogProvider} from "./FormatDialogContext.jsx";
import {useCallback, useEffect} from "react";

export default function ConfiguratorToolbar() {
    const {
        updateSelection,
        formulaDialogIsOpen,
        setFormulaDialogIsOpen,
        formatDialogIsOpen,
        setFormatDialogIsOpen,
        applyNetRateItaly,
        applyNetRateWorld,
        restore,
        deleteSelectedEntities,
        isOnStandardMode,
        setIsOnStandardMode,
    } = useRatePresenterContext();

    const handleOpenFormulaDialog = useCallback(() => setFormulaDialogIsOpen(true), [setFormulaDialogIsOpen]);
    const handleOpenFormatDialog = useCallback(() => setFormatDialogIsOpen(true), [setFormatDialogIsOpen]);
    const handleRestore = useCallback(() => restore(), [restore]);
    const handleNetRateItaly = useCallback(() => applyNetRateItaly(), [applyNetRateItaly]);
    const handleNetRateWorld = useCallback(() => applyNetRateWorld(), [applyNetRateWorld]);
    const handleDelete = useCallback(() => deleteSelectedEntities(), [deleteSelectedEntities]);

    function switchToStandard() {
        setIsOnStandardMode(true)
    }

    function switchToTailored() {
        setIsOnStandardMode(false)
    }

    // Keyboard shortcuts
    const keyActions = useCallback((event) => {
        if (formulaDialogIsOpen === false) {
            if (event.key === "A" && event.shiftKey) {
                updateSelection("everything");
                event.preventDefault();

            } else if (event.key === "Escape" && event.shiftKey) {
                updateSelection("nothing");
                event.preventDefault();

            } else if (event.key === "I" && event.shiftKey) {
                updateSelection("inverseEverything");
                event.preventDefault();

            } else if (event.key === "a") {
                updateSelection("all");
                event.preventDefault();

            } else if (event.key === "Escape") {
                updateSelection("none");
                event.preventDefault();

            } else if (event.key === "i") {
                updateSelection("inverse");
                event.preventDefault();

            } else if (event.key === "f" && event.ctrlKey) {
                handleOpenFormulaDialog();
                event.preventDefault();

            } else if (event.key === "Delete") {
                handleDelete();
                event.preventDefault();
            }
        }
    }, [updateSelection, handleOpenFormulaDialog, handleDelete]);


    useEffect(() => {
        window.addEventListener("keydown", keyActions);
        return () => {
            window.removeEventListener("keydown", keyActions);
        };
    }, [keyActions]);

    const toolbarItems = [
        {
            title: 'Modes',
            // icon: <DocumentIcon />,
            icon: isOnStandardMode ? <QueueListIcon /> : <ScissorsIcon />,
            items: [
                [
                    { name: 'Standard', icon: <QueueListIcon />, shortcutLabel: "", handler: switchToStandard },
                    { name: 'Tailored', icon: <ScissorsIcon />, shortcutLabel: "", handler: switchToTailored },
                ],
            ]
        },
        {
            title: 'Actions',
            icon: <BoltIcon />,
            items: [
                [
                    { name: 'Formula...', icon: <FxIcon />, shortcutLabel: "F", handler: handleOpenFormulaDialog },
                    { name: 'Net rate (world)', icon: <DocumentCurrencyDollarIcon />, shortcutLabel: "", handler: handleNetRateWorld },
                    { name: 'Net rate (Italia)', icon: <DocumentCurrencyEuroIcon />, shortcutLabel: "", handler: handleNetRateItaly },
                ],
                [
                    { name: 'Format...', icon: <SparklesIcon />, shortcutLabel: "", handler: handleOpenFormatDialog },
                    { name: 'Delete', icon: <BackspaceIcon />, shortcutLabel: "⌂", handler: handleDelete },
                ],
                [
                    { name: 'Restore', icon: <ArrowUturnLeftIcon />, shortcutLabel: "", handler: handleRestore },
                ]
            ]
        },
        {
            title: 'Selection',
            icon: <CursorArrowRaysIcon />,
            items: [
                [
                    { name: 'Select all', icon: <SelectAllIcon />, shortcutLabel: "A", handler: () => {updateSelection('all')} },
                    { name: 'Clear selection', icon: <Square2StackIcon />, shortcutLabel: "Esc", handler: () => {updateSelection('none')} },
                    { name: 'Invert selection', icon: <InvertSelectionIcon />, shortcutLabel: "I", handler: () => {updateSelection('inverse')} },
                ],
                [
                    { name: 'Select everything', icon: <SelectEverythingIcon />, shortcutLabel: "⇧A", handler: () => {updateSelection('everything')} },
                    { name: 'Select nothing', icon: <SelectNothingIcon />, shortcutLabel: "⇧Esc", handler: () => {updateSelection('nothing')} },
                    { name: 'Invert everything', icon: <InvertEverythingIcon />, shortcutLabel: "⇧I", handler: () => {updateSelection('inverseEverything')} },
                ]
            ]
        }
    ]

    return (
        <>
            <AbstractSecondaryToolbar actions={toolbarItems}/>
            <FormulaDialogProvider>
                <FormatDialogProvider>
                    {formulaDialogIsOpen && (
                        <FormulaDialog />
                    )}
                    {formatDialogIsOpen && (
                        <FormatDialog />
                    )}
                </FormatDialogProvider>
            </FormulaDialogProvider>
        </>

    )
}
