import 'react'
import {
    CalendarIcon,
    CheckIcon,
    CodeBracketIcon,
    ScissorsIcon, TrashIcon
} from '@heroicons/react/20/solid'
import { useTemplateContext } from '../../context/TemplatesContext.jsx'
import { ChevronUpDownIcon, FlagIcon } from "@heroicons/react/16/solid";
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
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Switch
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import StatusBadge from "../abstract/StatusBadge.jsx";
import { useSettingsContext } from "../../context/SettingsContext.jsx";

export function Basics({ initialCode, initialName, onChange }) {
    const [code, setCode] = useState(initialCode || "noname");
    const [name, setName] = useState(initialName || "Unnamed Template");

    useEffect(() => {
        setCode(initialCode || "noname");
        setName(initialName || "Unnamed Template");
    }, [initialCode, initialName]);

    // Whenever user types in Code
    const handleChangeCode = (e) => {
        const newVal = e.target.value;
        setCode(newVal);
        // Immediately inform parent
        onChange({ code: newVal, name });
    };

    // Whenever user types in Name
    const handleChangeName = (e) => {
        const newVal = e.target.value;
        setName(newVal);
        // Immediately inform parent
        onChange({ code, name: newVal });
    };

    return (
        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
            <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Identifiers
                </dt>
                <dd className="mt-1 sm:mt-0 sm:flex-auto">
                    <form>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                            {/* Code */}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="t-code"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Code (ID)
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="t-code"
                                        name="t-code"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 font-mono text-base
                                                             text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300
                                                             placeholder:text-gray-400 focus:outline focus:outline-2
                                                             focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        value={code}
                                        onChange={handleChangeCode}
                                    />
                                </div>
                            </div>

                            {/* Name */}
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="t-name"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="t-name"
                                        name="t-name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900
                                                             outline outline-1 -outline-offset-1 outline-gray-300
                                                             placeholder:text-gray-400 focus:outline focus:outline-2
                                                             focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        value={name}
                                        onChange={handleChangeName}
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

export function Languages({ initialLanguages = [], onChange }) {
    const AVAILABLE_LANGUAGES = [
        { code: "ar", flag: <SaudiArabiaFlagIcon className="size-5 inline" />, name: "Arabic" },
        { code: "ch", flag: <ChinaFlagIcon className="size-5 inline" />, name: "Chinese" },
        { code: "de", flag: <GermanyFlagIcon className="size-5 inline" />, name: "German" },
        { code: "en", flag: <UkFlagIcon className="size-5 inline" />, name: "English" },
        { code: "es", flag: <SpainFlagIcon className="size-5 inline" />, name: "Spanish" },
        { code: "fr", flag: <FranceFlagIcon className="size-5 inline" />, name: "French" },
        { code: "it", flag: <ItalyFlagIcon className="size-5 inline" />, name: "Italian" },
        { code: "jp", flag: <JapanFlagIcon className="size-5 inline" />, name: "Japanese" },
        { code: "pt", flag: <BrazilFlagIcon className="size-5 inline" />, name: "Portuguese" },
        { code: "ru", flag: <RussiaFlagIcon className="size-5 inline" />, name: "Russian" },
    ];

    const [selectedLangs, setSelectedLangs] = useState(initialLanguages);

    // Sync local state if parent changes initialLanguages
    // (For example, if you switch to a different template.)
    useEffect(() => {
        setSelectedLangs(initialLanguages);
    }, [initialLanguages]);

    const handleCheckboxChange = (code) => {
        setSelectedLangs((prev) => {
            let updated;
            if (prev.includes(code)) {
                // Remove if already present
                updated = prev.filter((c) => c !== code);
            } else {
                // Add if not present
                updated = [...prev, code];
            }
            // Notify parent exactly once, right here
            if (onChange) {
                onChange(updated);
            }
            return updated;
        });
    };

    return (
        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
            <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Supported languages
                </dt>
                <dd className="mt-1 sm:mt-0 sm:flex-auto">
                    <fieldset>
                        <legend className="sr-only">Supported languages</legend>
                        {AVAILABLE_LANGUAGES.map((lang) => (
                            <div key={lang.code} className="text-sm/6">
                                <input
                                    id={lang.code}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300
                                                         bg-white checked:border-indigo-600 checked:bg-indigo-600
                                                         focus-visible:outline focus-visible:outline-2
                                                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    checked={selectedLangs.includes(lang.code)}
                                    onChange={() => handleCheckboxChange(lang.code)}
                                />
                                <label
                                    htmlFor={lang.code}
                                    className="font-medium text-gray-900 ml-3 align-baseline"
                                >
                                    {lang.flag} {lang.name}
                                </label>
                            </div>
                        ))}
                    </fieldset>
                </dd>
            </div>
        </dl>
    );
}

export function Modes({ initialTailoredModeToggleEnabled = false, onChange }) {
    const [tailoredModeToggleEnabled, setTailoredModeToggleEnabled] = useState(initialTailoredModeToggleEnabled);

    const handleToggle = (val) => {
        setTailoredModeToggleEnabled(val);
        if (onChange) {
            onChange({ tailoredModeToggleEnabled: val });
        }
    };

    return (
        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
            <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Modes</dt>
                <dd className="mt-1 sm:mt-0 sm:flex-auto">
                    <fieldset>
                        <legend className="sr-only">Modes</legend>
                        <Field className="flex items-center">
                            <Switch
                                checked={tailoredModeToggleEnabled}
                                onChange={handleToggle}
                                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full
                                                     border-2 border-transparent bg-gray-200 transition-colors duration-200
                                                     ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600
                                                     focus:ring-offset-2 data-[checked]:bg-indigo-600"
                            >
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none inline-block size-5 transform rounded-full
                                                         bg-white shadow ring-0 transition duration-200 ease-in-out
                                                         group-data-[checked]:translate-x-5"
                                />
                            </Switch>
                            <Label as="span" className="ml-3 text-sm">
                                <span className="font-medium text-gray-900">
                                    Supports
                                    <ScissorsIcon className="text-gray-500 size-4 inline self-baseline ml-1" />
                                    <span className="text-gray-500">Tailored</span> mode
                                </span>
                            </Label>
                        </Field>
                    </fieldset>
                </dd>
            </div>
        </dl>
    );
}

function Display({ initialPriority, initialStatus, onChange }) {
    const { statuses } = useSettingsContext();
    const [priority, setPriority] = useState(initialPriority || 1);
    const [selectedStatus, setSelectedStatus] = useState(initialStatus || "provisional");

    const handlePriorityChange = (e) => {
        const newVal = e.target.value;
        setPriority(newVal);
        // Notify parent once
        onChange({ priority: newVal, selectedStatus });
    };

    const handleStatusChange = (val) => {
        setSelectedStatus(val);
        onChange({ priority, selectedStatus: val });
    };

    // If the parent changes initial values (swapping templates),
    // we re-sync them here:
    useEffect(() => {
        setPriority(initialPriority || 1);
        setSelectedStatus(initialStatus || "provisional");
    }, [initialPriority, initialStatus]);

    return (
        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
            <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Display
                </dt>
                <dd className="mt-1 sm:mt-0 sm:flex-auto">
                    <fieldset>
                        <legend className="sr-only">Display</legend>
                        <Listbox value={selectedStatus} onChange={handleStatusChange}>
                            <div className="relative mt-2">
                                {/* Priority */}
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="t-priority"
                                        className="block text-sm/6 font-medium text-gray-900"
                                    >
                                        Priority
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="t-priority"
                                            name="t-priority"
                                            type="number"
                                            className="block w-full mb-3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900
                                                                 outline outline-1 -outline-offset-1 outline-gray-300
                                                                 placeholder:text-gray-400 focus:outline focus:outline-2
                                                                 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            value={priority}
                                            onChange={handlePriorityChange}
                                        />
                                    </div>
                                </div>

                                {/* Status dropdown */}
                                <div>
                                    <label
                                        htmlFor="t-status"
                                        className="block text-sm/6 font-medium text-gray-900"
                                    >
                                        Status
                                    </label>
                                    <ListboxButton
                                        id="t-status"
                                        className="grid w-full cursor-default grid-cols-1
                                                             rounded-md bg-white py-2 pl-3 pr-2
                                                             text-left text-gray-900
                                                             outline outline-1 -outline-offset-1 outline-gray-300
                                                             focus:outline focus:outline-2 focus:-outline-offset-2
                                                             focus:outline-indigo-600 text-sm leading-6"
                                    >
                                        <span className="col-start-1 row-start-1 truncate pr-6">
                                            {selectedStatus ? <StatusBadge id={selectedStatus} /> : <Fragment />}
                                        </span>
                                        <ChevronUpDownIcon
                                            aria-hidden="true"
                                            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                        />
                                    </ListboxButton>

                                    <ListboxOptions
                                        transition
                                        className="absolute z-10 w-full overflow-auto rounded-md bg-white py-1
                                                             text-base shadow-lg ring-1 ring-black/5 focus:outline-none
                                                             data-[closed]:data-[leave]:opacity-0 data-[leave]:transition
                                                             data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                                    >
                                        {statuses.map((status) => (
                                            <ListboxOption
                                                key={`${status.id}-status`}
                                                value={status.id}
                                                className="group relative cursor-default select-none py-2 pl-8 pr-4
                                                                     text-gray-900 data-[focus]:bg-indigo-600
                                                                     data-[focus]:text-white data-[focus]:outline-none"
                                            >
                                                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                                                    <StatusBadge id={status.id} />
                                                </span>
                                                <span
                                                    className="absolute inset-y-0 left-0 flex items-center pl-1.5
                                                                         text-indigo-600 group-[&:not([data-selected])]:hidden
                                                                         group-data-[focus]:text-white"
                                                >
                                                    <CheckIcon aria-hidden="true" className="size-5" />
                                                </span>
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            </div>
                        </Listbox>
                    </fieldset>
                </dd>
            </div>
        </dl>
    );
}

export function TemplateOptionsEditor() {
    const { isCurrentlyEditingTemplate, templates, updateTemplateData, deleteTemplate } = useTemplateContext();
    const currentTemplate = templates[isCurrentlyEditingTemplate];

    const [currentTimestamp] = useState(() => Math.floor(Date.now() / 1000));
    const tags = [""]  // Placeholder, tags are not supported yet.

    const [formData, setFormData] = useState({
        code: currentTemplate?.code || "noname",
        name: currentTemplate?.name || "Unnamed Template",
        langs: currentTemplate?.langs || ["en", "it"],
        modes: currentTemplate?.modes || ["std"],
        tags: tags,
        status: currentTemplate?.status || "provisional",
        priority: currentTemplate?.priority || 1,
        lastUpdate: currentTimestamp,
    });

    useEffect(() => {
        if (!currentTemplate) return;

        setFormData({
            code: currentTemplate?.code || "noname",
            name: currentTemplate?.name || "Unnamed Template",
            langs: currentTemplate?.langs || ["en", "it"],
            modes: currentTemplate?.modes || ["std"],
            tags: tags,
            status: currentTemplate?.status || "provisional",
            priority: currentTemplate?.priority || 1,
            lastUpdate: currentTimestamp,
        });

    }, [currentTemplate, currentTimestamp]);

    /* Child handlers for each part */
    const handleBasicsChange = ({ code, name }) => {
        setFormData((prev) => ({
            ...prev,
            code: code ?? prev.code,
            name: name ?? prev.name,
        }));
    };

    const handleLanguagesChange = (langsArray) => {
        setFormData((prev) => ({
            ...prev,
            langs: langsArray,
        }));
    };

    const handleModesChange = ({ tailoredModeToggleEnabled }) => {
        setFormData((prev) => {
            let newModes = [...prev.modes];
            const hasTailored = newModes.includes("tailored");

            if (tailoredModeToggleEnabled && !hasTailored) {
                newModes.push("tailored");
            } else if (!tailoredModeToggleEnabled && hasTailored) {
                newModes = newModes.filter((m) => m !== "tailored");
            }
            return { ...prev, modes: newModes };
        });
    };

    const handleDisplayChange = ({ priority, selectedStatus }) => {
        setFormData((prev) => ({
            ...prev,
            priority: Number(priority) || 1,
            status: selectedStatus || "provisional",
        }));
    };

    const handleNameInHeader = (e) => {
        const newName = e.target.value;
        setFormData((prev) => ({
            ...prev,
            name: newName,
        }));
    };

    const handleSave = async () => {
        try {
            await updateTemplateData(isCurrentlyEditingTemplate, formData);
            alert("Template updated successfully!");
            window.location.reload();

        } catch (error) {
            alert(`Failed to update template: ${error}`);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTemplate(isCurrentlyEditingTemplate);
            window.location.reload();

        } catch (error) {
            alert(`Failed to delete template: ${error}`);
        }
    };

    return (
        <div className="mx-auto max-w-4xl px-5 mb-96">
            {/* HEADER */}
            <header className="lg:flex lg:items-center lg:justify-between mb-20 mt-10">
                <div className="min-w-0 flex-1">
                    {/* Name in header => keep in sync with formData.name */}
                    <input
                        type="text"
                        className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl
                                             sm:tracking-tight p-0 border border-px border-transparent
                                             hover:border-gray-300 focus:ring-indigo-700"
                        value={formData.name}
                        onChange={handleNameInHeader}
                    />

                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500 font-mono">
                            <CodeBracketIcon
                                aria-hidden="true"
                                className="mr-1.5 size-5 shrink-0 text-gray-400"
                            />
                            {formData.code}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <ScissorsIcon
                                aria-hidden="true"
                                className="mr-1.5 size-5 shrink-0 text-gray-400"
                            />
                            {formData.modes.length} mode(s)
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <FlagIcon
                                aria-hidden="true"
                                className="mr-1.5 size-5 shrink-0 text-gray-400"
                            />
                            {formData.langs.length} language(s)
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <CalendarIcon
                                aria-hidden="true"
                                className="mr-1.5 size-5 shrink-0 text-gray-400"
                            />
                            {currentTemplate?.lastUpdate
                                ? formatUnixTimestamp(currentTemplate.lastUpdate)
                                : "No date info"}
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main>
                <div className="flex flex-col space-y-16 sm:space-y-20">
                    {/* PARAMETERS */}
                    <section>
                        <h2 className="text-base/7 font-semibold text-gray-900">Parameters</h2>
                        <p className="mt-1 text-sm/6 text-gray-500">
                            These affect how the template is visualized within the Programmino app.
                        </p>

                        <Basics
                            initialCode={formData.code}
                            initialName={formData.name}
                            onChange={handleBasicsChange}
                        />

                        <Languages
                            initialLanguages={formData.langs}
                            onChange={handleLanguagesChange}
                        />

                        <Modes
                            // Convert modes array => boolean for "tailored"
                            initialTailoredModeToggleEnabled={formData.modes.includes("tailored")}
                            onChange={handleModesChange}
                        />

                        <Display
                            initialStatus={formData.status}
                            initialPriority={formData.priority}
                            onChange={handleDisplayChange}
                        />
                    </section>
                </div>

                <div className="pt-16 flex gap-5 justify-end">
                    <button
                        type="button"
                        className="inline-flex items-end rounded-md bg-chestnut-600 px-10 py-2
                                             text-sm font-semibold text-white shadow-sm hover:bg-chestnut-500
                                             focus-visible:outline focus-visible:outline-2
                                             focus-visible:outline-offset-2 focus-visible:outline-chestnut-600"
                        onClick={handleDelete}
                    >
                        <TrashIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5"/>
                        Delete
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-end rounded-md bg-indigo-600 px-10 py-2
                                             text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                                             focus-visible:outline focus-visible:outline-2
                                             focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                        onClick={handleSave}
                    >
                        <CheckIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5"/>
                        Save
                    </button>

                </div>
            </main>
        </div>
    );
}
