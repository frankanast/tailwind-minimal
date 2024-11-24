import {Dialog} from "@headlessui/react";
import {useSettingsContext} from "../../context/SettingsContext.jsx";
import RoomMappingForm from "./RoomMappingForm.jsx";
import RateMappingForm from "./RateMappingForm.jsx";
import {LinkIcon} from "@heroicons/react/16/solid/index.js";
import CommitIcon from "../../assets/CommitIcon.jsx";
import {useRoomMappingContext} from "../../context/RoomMappingFormContext.jsx";

export default function MappingDialog({ strategy }) {
    const { mappingDialogIsOpen, setMappingDialogIsOpen, refetch} = useSettingsContext();
    const {isCurrentlyEditing, shortName, resetForm, commitChanges} = useRoomMappingContext();

    function handleClose() {
        resetForm()
        setMappingDialogIsOpen(false);

    }

    function handleCommit() {
        commitChanges()
        handleClose()
        refetch()
    }

    return (
        <Dialog open={mappingDialogIsOpen} onClose={handleClose} className="relative z-50">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"/>
            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
                    <Dialog.Panel
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 h-[600px]"
                    >
                        <div className="sm:flex sm:items-start">
                            <div
                                className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-200 sm:mx-0 sm:h-10 sm:w-10">
                                <LinkIcon className="h-6 w-6 text-indigo-600"/>
                            </div>

                            <div className="w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <Dialog.Title as="h3" className="text-base font-semibold text-gray-900">
                                    Mapping Room <span className="font-mono font-normal">{isCurrentlyEditing} ({shortName?.en || "???"})</span>
                                </Dialog.Title>

                                <Dialog.Description as="p" className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                                    Click <i>Commit</i> to save your changes - be careful, the operation is irreversible. All fields are required.
                                </Dialog.Description>

                                <div className="overflow-y-auto max-h-[400px] mt-4">
                                    {/* if strategy is "room", render a room mapping form. Else, render a rate mapping form.*/}
                                    {(strategy === "room")
                                        ? <RoomMappingForm/>
                                        : <RateMappingForm/>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end sm:mt-6">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleCommit}
                            >
                                <CommitIcon className="-ml-0.5 size-5"/>
                                Commit
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
}
