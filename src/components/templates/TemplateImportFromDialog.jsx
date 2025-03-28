import {SwatchIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import {useEffect, useState} from "react";
import LoadingIcon from "../../assets/icons/LoadingIcon.jsx";

const TemplateSelector = ({selectedTemplate, setSelectedTemplate}) => {
    const [templates, setTemplates] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://programmino-be.onrender.com/templates')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to load templates (Network response issue)');
                }
                return response.json();

            })

            .then(data => {
                setTemplates(data);
                setLoading(false);
            })

            .catch(error => {
                setError(error);
                setLoading(false);
            });

    }, []);

    if (loading) return <LoadingIcon className="text-gray-500 size-5" />;
    if (error) return <XMarkIcon className="text-chestnut-700 size-5" />;

    return (
        <div>
            <select
                value={selectedTemplate}
                onChange={e => setSelectedTemplate(e.target.value)}
                className="block w-full rounded border-gray-300"
            >
                <option value="" disabled>
                    Template...
                </option>
                {templates.map((templateCode) => (
                    <option key={templateCode} value={templateCode}>{templateCode}</option>
                ))}
            </select>
        </div>
    )
}

const VersionSelector = ({selectedTemplate, selectedVersion, setSelectedVersion}) => {
    const [versions, setVersions] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://programmino-be.onrender.com/template/versions/${selectedTemplate}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to load versions (Network response issue)');
                }
                return response.json();

            })

            .then(data => {
                setVersions(data);
                setLoading(false);
            })

            .catch(error => {
                setError(error);
                setLoading(false);
            });

    }, [selectedTemplate]);

    if (loading) return <LoadingIcon className="text-gray-500 size-5" />;
    if (error) return <XMarkIcon className="text-chestnut-700 size-5" />;

    return (
        <div>
            <select
                value={selectedVersion ? selectedVersion.url : ""}
                onChange={(e) => {
                    const selectedUrl = e.target.value;
                    const found = versions.find(v => v.url === selectedUrl);
                    setSelectedVersion(found);
                }}
                className="block w-full rounded border-gray-300"
            >
                <option value="" className="text-gray-500" disabled>
                    Version...
                </option>
                {versions.map((v) => (
                    <option key={`${v.url}`} value={v.url}>{v.modeLiteral}, {v.languageLiteral}</option>
                ))}
            </select>
        </div>
    )
}

export default function TemplateImportFromDialog({open, setOpen, onImport}) {
    const [selectedTemplate, setSelectedTemplate] = useState('')
    const [selectedVersion, setSelectedVersion] = useState('')

    useEffect(() => {
        setSelectedVersion('');
    }, [selectedTemplate]);

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
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
                                <SwatchIcon aria-hidden="true" className="size-6 text-indigo-600" />
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                    Import content from...
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Please select a template and a version from the following menus.
                                        Current content in the editor will be overwritten.
                                    </p>
                                </div>

                                <div className="my-7 flex gap-3">
                                    <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
                                    {selectedTemplate !== '' &&
                                        <VersionSelector
                                            selectedTemplate={selectedTemplate}
                                            selectedVersion={selectedVersion}
                                            setSelectedVersion={setSelectedVersion}
                                        />
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={() => {
                                    if (selectedVersion) {
                                        onImport(selectedVersion);
                                    }
                                    setOpen(false);
                                }}
                                disabled={(selectedVersion === '')}
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto disabled:bg-white disabled:font-semibold disabled:text-gray-700 disabled:ring-1 disabled:ring-gray-300 "
                            >
                                Import
                            </button>
                            <button
                                type="button"
                                data-autofocus
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