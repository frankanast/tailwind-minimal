'use client'

import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function AbstractCheckableList({
                                          options = [],
                                          value,
                                          onChange,
                                          displayKey = 'name', // Default key for display
                                          idKey = 'id', // Default key for unique identification
                                          placeholder = 'Select an option',
                                      }) {
    const [query, setQuery] = useState('');

    const filteredOptions =
        query === ''
            ? options
            : options.filter((option) =>
                option[displayKey].toLowerCase().includes(query.toLowerCase())
            );

    return (
        <Combobox
            as="div"
            value={value}
            onChange={(selected) => {
                setQuery('');
                onChange(selected);
            }}
        >
            <div className="relative mt-2">
                <ComboboxInput
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    onChange={(event) => setQuery(event.target.value)}
                    onBlur={() => setQuery('')}
                    displayValue={(option) => option?.[displayKey] || ''}
                    placeholder={placeholder}
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="size-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>

                {filteredOptions.length > 0 && (
                    <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {filteredOptions.map((option) => (
                            <ComboboxOption
                                key={option[idKey]}
                                value={option}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                            >
                                <span className="block truncate group-data-[selected]:font-semibold">
                                  {option[displayKey]}
                                </span>

                                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                                    <CheckIcon className="size-5" aria-hidden="true" />
                                </span>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                )}
            </div>
        </Combobox>
    );
}
