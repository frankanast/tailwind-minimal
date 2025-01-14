import 'react'
import {
    CalendarIcon,
    CheckIcon,
    LinkIcon,
    CodeBracketIcon, ScissorsIcon
} from '@heroicons/react/20/solid'
import { useTemplateContext } from '../../context/TemplatesContext.jsx'
import {ChevronUpDownIcon, FlagIcon} from "@heroicons/react/16/solid";
import formatUnixTimestamp from "../../utils/formatUnixTimestamp.js";

import {
    UkFlagIcon,
    ItalyFlagIcon,
    SpainFlagIcon,
    FranceFlagIcon,
    GermanyFlagIcon,
    JapanFlagIcon,
    RussiaFlagIcon,
    ChinaFlagIcon,
    BrazilFlagIcon,
    SaudiArabiaFlagIcon,
} from "../../assets/icons/countryFlags.jsx";

import {
    Field,
    Label,
    Listbox,
    ListboxButton, ListboxOption, ListboxOptions,
    Switch
} from "@headlessui/react";
import {Fragment, useState} from "react";
import StatusBadge from "../abstract/StatusBadge.jsx";
import {useSettingsContext} from "../../context/SettingsContext.jsx";

export function Basics() {
    return (
        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
            <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Identifiers</dt>
                <dd className="mt-1 sm:mt-0 sm:flex-auto">
                    <form>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                            {/* Code */}
                            <div className="sm:col-span-3">
                                <label htmlFor="t-code" className="block text-sm/6 font-medium text-gray-900">
                                    Code (ID)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="t-code"
                                        name="t-code"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 font-mono text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            {/* Name */}
                            <div className="sm:col-span-3">
                                <label htmlFor="t-name" className="block text-sm/6 font-medium text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="t-name"
                                        name="t-name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                    </form>
                </dd>
            </div>
        </dl>
    );
}

export function Languages() {
    const languages = [
        {code: "ar", flag: <SaudiArabiaFlagIcon className="size-5 inline"/>, name: "Arabic", checked: false},
        {code: "ch", flag: <ChinaFlagIcon className="size-5 inline"/>, name: "Chinese", checked: false},
        {code: "de", flag: <GermanyFlagIcon className="size-5 inline"/>, name: "German", checked: false},
        {code: "en", flag: <UkFlagIcon className="size-5 inline"/>, name: "English", checked: true },
        {code: "es", flag: <SpainFlagIcon className="size-5 inline" />, name: "Spanish", checked: false },
        {code: "fr", flag: <FranceFlagIcon className="size-5 inline" />, name: "French", checked: false },
        {code: "it", flag: <ItalyFlagIcon className="size-5 inline" />, name: "Italian", checked: true },
        {code: "jp", flag: <JapanFlagIcon className="size-5 inline" />, name: "Japanese", checked: false },
        {code: "pt", flag: <BrazilFlagIcon className="size-5 inline" />, name: "Portuguese", checked: false },
        {code: "ru", flag: <RussiaFlagIcon className="size-5 inline" />, name: "Russian", checked: false },
    ]

    return (
        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
            <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Supported languages</dt>
                <dd className="mt-1 sm:mt-0 sm:flex-auto">
                    <fieldset>
                        <legend className="sr-only">Supported languages</legend>
                        {languages.map((language) => (
                            <div key={language.code} className="text-sm/6">
                                <input
                                    defaultChecked={language.checked}
                                    id={language.code}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <label htmlFor={languages.code} className="font-medium text-gray-900 ml-3 align-baseline">
                                    {language.flag} {language.name}
                                </label>
                            </div>
                        ))}
                    </fieldset>
                </dd>
            </div>
        </dl>
    );
}

export function Modes() {
    const [enabled, setEnabled] = useState(false)  // TODO: DEBUG

    return (
        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
            <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Modes</dt>
                <dd className="mt-1 sm:mt-0 sm:flex-auto">
                    <fieldset>
                        <legend className="sr-only">Modes</legend>
                        <Field className="flex items-center">
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
                            >
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                />
                            </Switch>
                            <Label as="span" className="ml-3 text-sm">
                                <span className="font-medium text-gray-900">Supports {<ScissorsIcon className="text-gray-500 size-4 inline self-baseline ml-1"/>}<span className="text-gray-500">Tailored</span> mode</span>
                            </Label>
                        </Field>
                    </fieldset>
                </dd>
            </div>
        </dl>
    );
}

function Display() {
    const {statuses} = useSettingsContext()
    const [selected, setSelected] = useState('provisional')

    return (
        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
            <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Display</dt>
                <dd className="mt-1 sm:mt-0 sm:flex-auto">
                    <fieldset>
                        <legend className="sr-only">Display</legend>
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-2">

                                <div className="sm:col-span-3">
                                    <label htmlFor="t-priority" className="block text-sm/6 font-medium text-gray-900">
                                        Priority
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="t-priority"
                                            name="t-priority"
                                            type="number"
                                            className="block w-full mb-3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="t-status" className="block text-sm/6 font-medium text-gray-900">
                                        Status
                                    </label>
                                    <ListboxButton id="t-status" className="
                                        grid w-full cursor-default grid-cols-1
                                        rounded-md bg-white
                                        py-2 pl-3 pr-2
                                        text-left text-gray-900
                                        outline outline-1 -outline-offset-1 outline-gray-300
                                        focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600
                                        text-sm leading-6"
                                    >
                                    <span className="col-start-1 row-start-1 truncate pr-6">{(selected) ?
                                        <StatusBadge id={selected}/> : <Fragment/>}</span>
                                    <ChevronUpDownIcon
                                        aria-hidden="true"
                                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                    </ListboxButton>
                                    <ListboxOptions
                                        transition
                                        className="absolute z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                                    >
                                        {
                                            statuses.map((status) => (
                                                <ListboxOption
                                                    key={`${status.id}-status`}
                                                    value={status.id}
                                                    className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                                                >
                                                <span
                                                    className="block truncate font-normal group-data-[selected]:font-semibold"><StatusBadge
                                                    id={status.id || "test"}/></span>

                                                    <span
                                                        className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                                                <CheckIcon aria-hidden="true" className="size-5"/>
                                            </span>
                                                </ListboxOption>
                                            ))
                                        }
                                    </ListboxOptions>
                                </div>



                                <ListboxOptions
                                    transition
                                    className="absolute z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                                >
                                    {
                                        statuses.map((status) => (
                                            <ListboxOption
                                                key={`${status.id}-status`}
                                                value={status.id}
                                                className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                                            >
                                                <span
                                                    className="block truncate font-normal group-data-[selected]:font-semibold"><StatusBadge
                                                    id={status.id || "test"}/></span>

                                                <span
                                                    className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                                                <CheckIcon aria-hidden="true" className="size-5"/>
                                            </span>
                                            </ListboxOption>
                                        ))
                                    }
                                </ListboxOptions>
                            </div>
                        </Listbox>
                    </fieldset>
                </dd>
            </div>
        </dl>
    )
}

export function TemplateOptionsEditor() {
    const {isCurrentlyEditingTemplate, templates} = useTemplateContext()
    const currentTemplate = templates[isCurrentlyEditingTemplate]

    return (
        <div className="mx-auto max-w-3xl px-5 mb-96">
            {/*<header className="lg:flex lg:items-center lg:justify-between mb-20 mt-10 overflow-auto">*/}
            <header className="lg:flex lg:items-center lg:justify-between mb-20 mt-10">
                <div className="min-w-0 flex-1">
                    <input
                        type="text"
                        className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight p-0 border border-px border-transparent hover:border-gray-300 focus:ring-indigo-700"
                        value={currentTemplate?.name || "???"}
                    />
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500 font-mono">
                            <CodeBracketIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400"/>
                            {currentTemplate?.code || "???"}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <ScissorsIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400"/>
                            {currentTemplate?.modes?.length || "???"} mode(s)
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <FlagIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400"/>
                            {currentTemplate?.langs?.length || "???"} language(s)
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <CalendarIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400" />
                            {(currentTemplate?.lastUpdate) ? formatUnixTimestamp(currentTemplate?.lastUpdate) : "No date info"}
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                      <span className="ml-3 hidden sm:block">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <LinkIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5 text-gray-400" />
                                Run a test
                            </button>
                      </span>
                    <span className="sm:ml-3">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                              <CheckIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5" />
                              Save
                        </button>
                    </span>
                </div>
            </header>

            <main>
                {/* Container for all sections */}
                {/*<div className="space-y-16 sm:space-y-20 h-full">*/}
                <div className="flex flex-col space-y-16 sm:space-y-20">
                    {/* Parameters */}
                    <section>
                        <h2 className="text-base/7 font-semibold text-gray-900">Parameters</h2>
                        <p className="mt-1 text-sm/6 text-gray-500">
                            These affect how the template is visualized within the Programmino app.
                        </p>
                        <Basics />
                        <Languages />
                        <Modes />
                        <Display />
                    </section>
                </div>
            </main>
        </div>
    )
}
