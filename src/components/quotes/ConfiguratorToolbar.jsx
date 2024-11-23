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
    GlobeAltIcon,
    ArrowTopRightOnSquareIcon,
    DocumentDuplicateIcon,
    EnvelopeIcon,
    StarIcon,
    SwatchIcon
} from '@heroicons/react/20/solid'
import {useRatePresenterContext} from "../../context/RatePresenterContext.jsx";
import {Square2StackIcon, } from "@heroicons/react/24/outline";
import FxIcon from "../../assets/FxIcon.jsx";
import SelectAllIcon from "../../assets/SelectAllIcon.jsx";
import InvertSelectionIcon from "../../assets/InvertSelectionIcon.jsx";
import InvertEverythingIcon from "../../assets/InvertEverythingIcon.jsx";
import SelectNothingIcon from "../../assets/SelectNothingIcon.jsx";
import SelectEverythingIcon from "../../assets/SelectEverythingIcon.jsx";
import FormulaDialog from "./FormulaDialog.jsx";
import FormatDialog from "./FormatDialog.jsx";
import {FormulaDialogProvider} from "../../context/FormulaDialogContext.jsx";
import {FormatDialogProvider} from "../../context/FormatDialogContext.jsx";
import {Fragment, useCallback, useEffect} from "react";
import {useQuoteContext} from "../../context/QuoteContext.jsx";
import UkFlagIcon from "../../assets/UkFlagIcon.jsx";
import ItalyFlagIcon from "../../assets/ItalyFlagIcon.jsx";
import {useQuotePreviewContext} from "../../context/QuotePreviewContext.jsx";

export default function ConfiguratorToolbar() {
    const {loadedData} = useQuoteContext()
    const {
        updateSelection,
        selectedItems,
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

    const {
        copyHtmlContent,
        copyTextContent,
        openPreviewLink,
        openWebsiteLink,
    } = useQuotePreviewContext()

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

    const keyActions = useCallback((event) => {
        // Shortcuts may interfere with the user editing in FormulaDialog.
        // Shortcuts may raise exceptions if they call a method on selectedItems when selectedItems is empty.
        console.log(selectedItems.length > 0)
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
            title: 'View',
            icon: isOnStandardMode ? <QueueListIcon /> : <ScissorsIcon />,
            items: [
                [
                    { name: 'Standard', icon: <QueueListIcon />, shortcutLabel: "", handler: switchToStandard },
                    { name: 'Tailored', icon: <ScissorsIcon />, shortcutLabel: "", handler: switchToTailored },
                ],
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
        },
        {
            title: 'Edit',
            icon: <BoltIcon />,
            items: [
                [
                    { name: 'Formula...', icon: <FxIcon />, shortcutLabel: "⌘F", handler: handleOpenFormulaDialog },
                    { name: 'Net rate (world)', icon: <DocumentCurrencyDollarIcon />, shortcutLabel: "", handler: handleNetRateWorld },
                    { name: 'Net rate (Italia)', icon: <DocumentCurrencyEuroIcon />, shortcutLabel: "", handler: handleNetRateItaly },
                ],
                [
                    { name: 'Format...', icon: <SparklesIcon />, shortcutLabel: "", handler: handleOpenFormatDialog },
                    { name: 'Delete', icon: <BackspaceIcon />, shortcutLabel: "DEL", handler: handleDelete },
                ],
                [
                    { name: 'Restore', icon: <ArrowUturnLeftIcon />, shortcutLabel: "", handler: handleRestore },
                ]
            ]
        },
        {
            title: 'Letter',
            icon: <EnvelopeIcon />,
            items: [
                [
                    { name: 'Italian', icon: <ItalyFlagIcon />, handler: () => {} },
                    { name: 'English', icon: <UkFlagIcon />, handler: () => {} },
                ],
                [
                    { name: 'Favorite Templ. 1', icon: <StarIcon />, handler: () => {} },
                    { name: 'Favorite Templ. 2', icon: <StarIcon />, handler: () => {} },
                    { name: 'Favorite Templ. 3', icon: <StarIcon />, handler: () => {} },
                    { name: 'Select Template...', icon: <SwatchIcon />, handler: () => {} },
                ],
            ]
        },
        {
            title: 'Navigation',
            icon: <GlobeAltIcon />,
            items: [
                [
                    { name: 'Copy content', icon: <DocumentDuplicateIcon />, handler: copyHtmlContent},
                    { name: 'Copy plain text', icon: <DocumentDuplicateIcon />, handler: copyTextContent},
                ],
                [
                    { name: 'Open preview...', icon: <ArrowTopRightOnSquareIcon />, handler: openPreviewLink },
                    { name: 'Open website...', icon: <GlobeAltIcon />, handler: openWebsiteLink },
                ],
            ]
        },
    ]

    return (
        <>
            {loadedData ? <AbstractSecondaryToolbar actions={toolbarItems} /> : <Fragment />}
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