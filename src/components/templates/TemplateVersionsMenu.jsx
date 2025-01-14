import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useTemplateContext } from '../../context/TemplatesContext.jsx'
import { nanoid } from 'nanoid'

import {
    SaudiArabiaFlagIcon,
    ChinaFlagIcon,
    GermanyFlagIcon,
    UkFlagIcon,
    SpainFlagIcon,
    FranceFlagIcon,
    ItalyFlagIcon,
    JapanFlagIcon,
    BrazilFlagIcon,
    RussiaFlagIcon,
} from "../../assets/icons/countryFlags.jsx";
import { FlagIcon } from '@heroicons/react/16/solid'

import { useState } from 'react'

export default function TemplateVersionsMenu() {
    const { versions } = useTemplateContext()
    const [selectedVersion, setSelectedVersion] = useState(versions?.[0] ?? null)

    const modes = {
        std: 'Standard',
        tailored: 'Tailored',
    }

    // Allowed values: 'it', 'en', 'es', 'fr', 'de', 'jp'
    const flagSize = "h-5 w-auto"
    const flags = {
        unnamed: <FlagIcon className={flagSize} />,
        ar: <SaudiArabiaFlagIcon className={flagSize} />,
        ch: <ChinaFlagIcon className={flagSize} />,
        de: <GermanyFlagIcon className={flagSize} />,
        en: <UkFlagIcon className={flagSize} />,
        es: <SpainFlagIcon className={flagSize} />,
        fr: <FranceFlagIcon className={flagSize} />,
        it: <ItalyFlagIcon className={flagSize} />,
        jp: <JapanFlagIcon className={flagSize} />,
        pt: <BrazilFlagIcon className={flagSize} />,
        ru: <RussiaFlagIcon className={flagSize} />,
    }

    return (
        <Listbox value={selectedVersion} onChange={setSelectedVersion}>
            <div className="relative mt-2">
                {/* Button */}
                <ListboxButton
                    className="grid w-full cursor-default grid-cols-1 rounded-md bg-white
                     py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1
                     -outline-offset-1 outline-gray-300
                     focus:outline focus:outline-2 focus:-outline-offset-2
                     focus:outline-indigo-600 sm:text-sm/6"
                >
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        {/* Display for the selected version */}
                          {selectedVersion ? (
                              <>
                                  {flags[selectedVersion.language] || <FlagIcon />}
                                  <span className="block truncate">
                                      {modes[selectedVersion.mode] || selectedVersion.mode}
                                  </span>
                                  <span className="ml-2 text-gray-500">
                                      {selectedVersion.code}
                                  </span>
                              </>
                          ) : (
                              <span className="block truncate text-gray-400">
                            No version selected
                          </span>
                          )}
                    </span>

                    {/* Dropdown Icon */}
                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center
                       justify-self-end text-gray-500 sm:size-4"
                    />
                </ListboxButton>

                {/* Options */}
                {versions && versions.length > 0 && (
                    <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto
                       rounded-md bg-white py-1 text-base shadow-lg ring-1
                       ring-black/5 focus:outline-none
                       data-[closed]:data-[leave]:opacity-0
                       data-[leave]:transition data-[leave]:duration-100
                       data-[leave]:ease-in sm:text-sm"
                    >
                        {versions.map((version) => (
                            <ListboxOption
                                key={nanoid()}
                                value={version}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9
                                   text-gray-900 data-[focus]:bg-indigo-600
                                   data-[focus]:text-white data-[focus]:outline-none"
                            >
                                {/* Option content */}
                                <div className="flex items-center">
                                    <span className="flex h-3 w-3 items-center justify-center">
                                        {flags[version.language] || flags.unnamed}
                                    </span>
                                    <span className="ml-3 truncate font-normal group-data-[selected]:font-semibold">
                                        {modes[version.mode] || version.mode}
                                    </span>
                                    <span className="ml-2 truncate text-gray-500 group-data-[focus]:text-indigo-200">
                                        {version.code}
                                    </span>
                                </div>

                                {/* Check icon (only visible if selected) */}
                                <span
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white"
                                >
                                  <CheckIcon aria-hidden="true" className="size-5" />
                                </span>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                )}
            </div>
        </Listbox>
    )
}
