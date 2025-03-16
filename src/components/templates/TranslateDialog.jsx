import {useState} from "react";
import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {LanguageIcon} from "@heroicons/react/20/solid/index.js";
import getCountryFlag from "../../utils/getCountryFlag.jsx";
import LoadingIcon from "../../assets/icons/LoadingIcon.jsx";
import {CheckIcon} from "@heroicons/react/20/solid";

export default function TranslateDialog({open, setOpen, onTranslate}) {
    const [selectedLanguage, setSelectedLanguage] = useState('en')
    const [isLoading, setIsLoading] = useState(false)

    const icons = {
        static: <CheckIcon className="text-white size-5 mr-2"/>,
        loading: <LoadingIcon className="text-white size-5 mr-2"/>
    }

    const handleTranslateClick = async () => {
        setIsLoading(true);
        try {
            await onTranslate(selectedLanguage);

        } catch (error) {
            alert("An error occurred, please try again later.")

        } finally {
            setIsLoading(false);
            setOpen(false);

        }
    };


    return (
        <Dialog open={open} onClose={() => { if (!isLoading) setOpen(false) }} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:size-10">
                                <LanguageIcon aria-hidden="true" className="size-6 text-indigo-600" />
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                    Translate with AI
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Please select one of the supported languages from the list.<br/>
                                        Room and rate names will be not translated.
                                        Current content will be overwritten.
                                    </p>
                                </div>

                                <div className="my-7 flex gap-3 items-center">
                                    {getCountryFlag(selectedLanguage, "size-9")}
                                    <select
                                        value={selectedLanguage}
                                        onChange={e => setSelectedLanguage(e.target.value)}
                                        className="w-full rounded border-gray-300"
                                    >
                                        <option value="it">Italian</option>
                                        <option value="en">English</option>
                                        <option value="ua">Arabic</option>
                                        <option value="zh_cn">Chinese</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                        <option value="jp">Japanese</option>
                                        <option value="pt_br">Portuguese</option>
                                        <option value="ru">Russian</option>
                                        <option value="es">Spanish</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={handleTranslateClick}
                                disabled={isLoading}
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                            >
                                { isLoading ? icons.loading : icons.static }
                                Translate
                            </button>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>

                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}