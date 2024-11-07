import {Dialog, Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/react";
import {useEffect, useState} from "react";
import {CheckIcon, CodeBracketIcon, XMarkIcon} from "@heroicons/react/20/solid/index.js";
import FxIcon from "../../assets/FxIcon.jsx";
import validateFormula from "../../utils/validateFormula.js";
import {nanoid} from "nanoid";


function FormulaPresetsMenu({ formulaPresets }) {
    return (
        // <Listbox value={selected} onChange={setSelected}>
        <Listbox >
            <div className="relative">
                <ListboxButton>
                    <FxIcon className="inline-flex size-5 text-gray-400" />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in"
                >
                    {formulaPresets.map((preset) => (
                        <ListboxOption
                            key={preset.id}
                            value={preset.id}
                            className="group cursor-default select-none p-4 text-sm text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                        >
                            <div className="flex flex-col">
                                <div className="flex justify-between">
                                    <p className="font-normal group-data-[selected]:font-semibold">{preset.name}</p>
                                        <span className="text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                        </span>
                                </div>
                                <p className="mt-2 text-gray-500 group-data-[focus]:text-indigo-200">{preset.description}</p>
                            </div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}

const FormulaDialog = ({ onClose, formulaInput, handleFormulaInputChange, handleFormulaSubmit }) => {
    const fakeScope = {
        // "Real" scope is computed at mapping time, for each rate element.
        // During validation operations, we use fake values. We don't care of the result, we need to check the syntax.
        // The fake value is 1 because it's the one that is not likely to generate errors (0 could raise a division by 0 error, for example).
        rateAmount: 1,
        adultsCount: 1,
        childrenCount: 1,
        guestCount: 1,
        los: 1,
    };

    const formulaPresets = [
        // TODO: When Authentication will be implemented and metadata will be exposed by a context,
        // formulaPresets will be consumed from there (so it can be customized for each client according to corporate needs)
        {id: nanoid(), name: "Repeating Guest", description: "Repeating Guest (min 4 stays): 5% discount.", expression: "rateAmount - 5%"},
        {id: nanoid(), name: "Loyalty Guest", description: "Repeating Guest (min 4 stays): 10% discount.", expression: "rateAmount - 10%"},
        {id: nanoid(), name: "10% Discount", description: "Preferential rate: 10% reduction on nightly rate.", expression: "rateAmount - 10%"},
        {id: nanoid(), name: "No Breakfast", description: "Rates net breakfast quota.", expression: "rateAmount - (38 * adults)"},
        {id: nanoid(), name: "Net VAT", description: "Rate Amount, net 10% VAT.", expression: "rateAmount / 1.1"},
    ]

    const variables = Object.keys(fakeScope)

    const [formulaIsValid, setFormulaIsValid] = useState(true);
    // useEffect(() => {
    //     if (!formulaInput) {
    //         return true
    //
    //     } else {
    //         setFormulaIsValid(validateFormula(formulaInput, fakeScope));
    //     }
    // }, [formulaInput]);

    return (
        <Dialog as="div" className="relative z-50" onClose={onClose}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
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
                        <div>
                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                <Dialog.Title as="h3" className="text-lg font-medium mb-6 leading-6 text-gray-600">
                                    Formula Editor
                                </Dialog.Title>
                                <div className="mt-2 min-w-0">
                                    <form className="flex flex-col relative gap-7 w-full">
                                        <div>
                                            <label htmlFor="apply-on">Apply on</label>
                                            <input
                                                type="text"
                                                id="apply-on"
                                                className="w-full rounded-md border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                                                onChange={() => {
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="formula-edit">Formula</label>
                                            <div className='w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 bg-gray-800'>
                                                            <textarea
                                                                id="formula-edit"
                                                                className="w-full h-40 border-none rounded-t-md bg-gray-800 font-mono font-semibold text-gray-300"
                                                                style={{resize: 'none'}}
                                                                placeholder="ex: rateAmount - 10%"
                                                                value={formulaInput}
                                                                onChange={handleFormulaInputChange}
                                                            />
                                                <div className="flex justify-end w-full h-8 px-3 gap-3 border-none rounded-b-md font-mono bg-gray-800 text-gray-400">
                                                    {/*<FxIcon className="inline-flex size-5 text-gray-400"/>*/}
                                                    <FormulaPresetsMenu formulaPresets={formulaPresets} />
                                                    <CodeBracketIcon className="inline-flex size-5 text-gray-400"/>
                                                    <>
                                                        {(formulaIsValid)
                                                            ? <CheckIcon className="inline-flex size-5 text-indigo-400" />
                                                            : <XMarkIcon className="inline-flex size-5 text-chestnut-400" />
                                                        }
                                                    </>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
};

export default FormulaDialog