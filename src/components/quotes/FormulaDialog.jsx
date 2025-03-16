'use client'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import {useRatePresenterContext} from "../../context/RatePresenterContext.jsx";
import FxIcon from "../../assets/icons/FxIcon.jsx";
import {CheckIcon, XMarkIcon} from '@heroicons/react/20/solid'
import {useFormulaDialogContext} from "../../context/FormulaDialogContext.jsx";
import RateSelectionDropdown from "./RateSelectionDropdown.jsx";

function PresetFormulaList({onPresetSelect}) {
    const {formulaPresets} = useFormulaDialogContext();

    const handleClick = (preset) => {
        onPresetSelect(preset.expression);
    };

    return (
        <ul role="list" className="mt-2 divide-y divide-slate-200 max-h-80 overflow-auto">
            {formulaPresets.map((preset) => (
                <li
                    key={preset.id}
                    className="flex items-center justify-between pl-3 py-3 hover:bg-slate-200 select-none cursor-pointer"
                    onClick={() => handleClick(preset)}
                >
                    <div className="min-w-0">
                        <div className="flex items-start gap-x-3">
                            <p className="text-sm/6 font-semibold text-gray-900">{preset.name}</p>
                        </div>
                        <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                            <p className="whitespace-nowrap">
                                {preset.description}
                            </p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

function FormulaEditForm() {
    const {
        formulaInput,
        setFormulaInput,
        formulaIsValid,
        formulaError,
        newName,
        setNewName,
        selectedRateOptions,
        setSelectedRateOptions,
    } = useFormulaDialogContext();
    const { allRates } = useRatePresenterContext();

    const handleFormulaChange = (event) => {
        setFormulaInput(event.target.value);
    };

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    return(
        <form className="flex flex-col relative gap-7 grow">
            <div className="flex flex-col space-y-5">
                <div>
                    <RateSelectionDropdown
                        allRates={allRates}
                        selectedRateOptions={selectedRateOptions}
                        setSelectedRateOptions={setSelectedRateOptions}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="new-name"
                        placeholder="New name"
                        className="w-full rounded-md border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                        value={newName}
                        onChange={handleNewNameChange}
                    />
                </div>
            </div>
            <div>
                <div className='rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-gray-800'>
                    <textarea
                        id="formula-edit"
                        className="w-full h-40 border-none rounded-t-md bg-gray-800 font-mono font-semibold text-gray-300 resize-none"
                        placeholder="ex: rateAmount - 10%"
                        value={formulaInput}
                        onChange={handleFormulaChange}
                    />
                    <div className="flex justify-end items-center w-full h-8 px-3 pb-2 gap-3 border-none rounded-b-md bg-gray-800 text-gray-400">
                        <span>{formulaInput?.length}</span>
                        <>
                            {formulaIsValid
                                ? <CheckIcon className="inline-flex size-5 text-indigo-400"/>
                                : <XMarkIcon className="inline-flex size-5 text-chestnut-400 cursor-pointer" onClick={() => alert(formulaError || "This formula contains an undetectable syntax error.")}/>
                            }
                        </>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default function FormulaDialog() {
    const {formulaDialogIsOpen, setFormulaDialogIsOpen, applyRateVariation} = useRatePresenterContext()
    const {formulaInput, setFormulaInput, selectedRateOptions, newName} = useFormulaDialogContext()

    function handleClose() {
        setFormulaDialogIsOpen(false);
    }

    const handlePresetSelect = (expression) => {
        setFormulaInput((prevFormula) => prevFormula + expression);
    };

    const handleApplyRate = () => {
        applyRateVariation(formulaInput, {}, selectedRateOptions, newName);
        handleClose()
    }

    return (
        <Dialog open={formulaDialogIsOpen} onClose={handleClose} className="relative z-50">
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
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200 sm:mx-0 sm:h-10 sm:w-10">
                                <FxIcon className="h-6 w-6 text-slate-600" />
                            </div>
                            <div className="w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                    Formula editor
                                </DialogTitle>
                                <div className="mt-2">
                                    <div className="flex flex-row gap-7">
                                        <FormulaEditForm />
                                        <PresetFormulaList onPresetSelect={handlePresetSelect}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4 flex justify-end">
                            <button
                                type="button"
                                onClick={handleApplyRate}
                                className="inline-flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 sm:w-auto"
                            >
                                Apply
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
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
