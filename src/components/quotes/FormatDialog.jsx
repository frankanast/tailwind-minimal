'use client'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
} from '@headlessui/react'
import {useRatePresenterContext} from "./RatePresenterContext.jsx";
import {useFormatDialogContext} from "./FormatDialogContext.jsx";

export default function FormatDialog() {
    const {formatDialogIsOpen, setFormatDialogIsOpen} = useRatePresenterContext();
    const {loadedData} = useFormatDialogContext()

    function handleClose() {
        setFormatDialogIsOpen(false);
    }

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
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="h-72 overflow-auto"><pre>{JSON.stringify(loadedData, 2, null) || ""}</pre></div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
