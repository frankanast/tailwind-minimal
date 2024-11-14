import {Popover} from "@headlessui/react";
import {ChevronUpDownIcon} from "@heroicons/react/20/solid/index.js";
import BoxIcon from "../../assets/BoxIcon.jsx";

export default function RateSelectionDropdown({allRates, selectedRateOptions, setSelectedRateOptions, label="Apply on..."}) {
    const handleCheckboxChange = (rateId) => {
        setSelectedRateOptions((prevSelected) =>
            prevSelected.includes(rateId)
                ? prevSelected.filter((id) => id !== rateId)
                : [...prevSelected, rateId]
        );
    };

    return (
        <div className="relative mt-2">
            <Popover>
                {({ open }) => (
                    <>
                        <Popover.Button
                            className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        >
                            {label}
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <div className="h-5 w-5 text-sm text-center rounded-md bg-gray-300 text-white">{selectedRateOptions?.length}</div>
                                <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-300" />
                            </span>
                        </Popover.Button>
                        <Popover.Panel
                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            <div>
                                {allRates.current.map((rate) => (
                                    <div
                                        key={rate.id}
                                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-slate-300 hover:bg-slate-200"
                                    >
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={rate.id}
                                                checked={selectedRateOptions.includes(rate.id)}
                                                onChange={() => handleCheckboxChange(rate.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-500"
                                            />
                                            <label
                                                htmlFor={rate.id}
                                                className="ml-3 block truncate font-normal group-data-[selected]:font-semibold"
                                            >
                                                {rate.is_package ? (
                                                    <BoxIcon className="inline mr-1 h-4 w-4 text-gray-500" />
                                                ) : null}
                                                {rate.name}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </div>
    );
}
