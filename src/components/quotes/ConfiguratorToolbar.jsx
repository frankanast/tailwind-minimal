// This is an implementation of AbstractSecondaryToolbar for QuoteConfigurator.
// It takes a setter method as a prop, while each functionality is included in the component file
// (we don't want this to be reusable).
// The dataset contains row data from an AG grid that needs to be manipulated.

import AbstractSecondaryToolbar from "../abstract/toolbars/AbstractSecondaryToolbar.jsx";
import {
    BoltIcon,
    CursorArrowRaysIcon,
    XMarkIcon,
    SparklesIcon,
    DocumentCurrencyEuroIcon,
    DocumentCurrencyDollarIcon, ArrowUturnLeftIcon, BackspaceIcon, ScissorsIcon, QueueListIcon, DocumentIcon
} from '@heroicons/react/20/solid'

import {Square2StackIcon} from "@heroicons/react/24/outline";
import FxIcon from "../../assets/FxIcon.jsx";
import {useRatePresenterContext} from "./RatePresenterContext.jsx";
import SelectAllIcon from "../../assets/SelectAllIcon.jsx";
import InvertSelectionIcon from "../../assets/InvertSelectionIcon.jsx";
import { Dialog, Transition } from "@headlessui/react";
import {Fragment} from "react";
import InvertEverythingIcon from "../../assets/InvertEverythingIcon.jsx";
import SelectNothingIcon from "../../assets/SelectNothingIcon.jsx";
import SelectEverythingIcon from "../../assets/SelectEverythingIcon.jsx";

export default function ConfiguratorToolbar() {
    const {
        updateSelection,
        formulaDialogIsOpen,
        setFormulaDialogIsOpen,
        applyFormula,
        formulaInput,
        setFormulaInput,
        applyNetRateItaly,
        applyNetRateWorld,
        restore,
        deleteSelectedEntities,
    } = useRatePresenterContext();

    const handleOpenFormulaDialog = () => {
        setFormulaDialogIsOpen(true);
    };

    const handleFormulaSubmit = () => {
        applyFormula()
        setFormulaDialogIsOpen(false);
    }

    const handleFormulaInputChange = (event) => {
        setFormulaInput(event.target.value);
    };

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

            <Transition.Root show={formulaDialogIsOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={handleFormulaSubmit}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                            onClick={handleFormulaSubmit}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-600">
                                                <FxIcon className="inline-flex size-7 text-gray-600"/>
                                                Formula Editor
                                            </Dialog.Title>
                                            <div className="mt-2 min-w-0 flex-1">

                                                <form action="#" className="relative">
                                                    <label htmlFor="apply-on">Apply on</label>
                                                    <input
                                                        type="text"
                                                        id="apply-on"
                                                        className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                                        placeholder="ex: rateAmount - 10%"
                                                        value={formulaInput}
                                                        onChange={handleFormulaInputChange}
                                                    />

                                                    <div className="h-7"/>

                                                    <label htmlFor="formula-edit">Formula</label>
                                                    <input
                                                        type="text"
                                                        id="formula-edit"
                                                        className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                                        placeholder="ex: rateAmount - 10%"
                                                        value={formulaInput}
                                                        onChange={handleFormulaInputChange}
                                                    />

                                                    <button
                                                        type="button"
                                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                                        onClick={handleFormulaSubmit}
                                                    >
                                                        Apply
                                                    </button>

                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </>
    )
}
