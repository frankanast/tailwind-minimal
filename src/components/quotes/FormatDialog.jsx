'use client'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
} from '@headlessui/react'
import {useRatePresenterContext} from "../../context/RatePresenterContext.jsx";
import RateSelectionDropdown from "./RateSelectionDropdown.jsx";
import {useEffect, useState} from "react";

export default function FormatDialog() {
    const {
        formatDialogIsOpen,
        setFormatDialogIsOpen,
        allRates,
        hiddenRates,
        setHiddenRates,
        deleteRates,
    } = useRatePresenterContext();

    const [selectedRateOptions, setSelectedRateOptions] = useState([])

    function handleClose() {
        setFormatDialogIsOpen(false);
    }

    function handleDeleteRates() {
        deleteRates()
        setFormatDialogIsOpen(false);

    }

    useEffect(() => {
        setHiddenRates(selectedRateOptions);
        console.log(selectedRateOptions);
        console.log(hiddenRates);

    }, [selectedRateOptions, setHiddenRates]);


    return (
        <Dialog open={formatDialogIsOpen} onClose={handleClose} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-xl sm:p-6 max-h-screen"
                    >
                        <div className="h-[50vh] overflow-auto">
                            <RateSelectionDropdown
                                allRates={allRates}
                                selectedRateOptions={selectedRateOptions}
                                setSelectedRateOptions={setSelectedRateOptions}
                                label="Remove..."
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleDeleteRates}
                            className="inline-flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 sm:w-auto"
                        >
                            Delete rates
                        </button>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
