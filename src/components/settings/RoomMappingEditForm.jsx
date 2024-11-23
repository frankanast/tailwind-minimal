import ItalyFlagIcon from "../../assets/ItalyFlagIcon.jsx";
import UkFlagIcon from "../../assets/UkFlagIcon.jsx";
import {InformationCircleIcon} from "@heroicons/react/16/solid/index.js";
import AbstractCheckableList from "../abstract/AbstractCheckableList.jsx";
import {Field, Label, Switch} from "@headlessui/react";
import {useSettingsContext} from "../../context/SettingsContext.jsx";
import {useRoomMappingFormContext} from "../../context/RoomMappingFormContext.jsx";
import classNames from "../../utils/classNames.js";
import formatUnixTimestamp from "../../utils/formatUnixTimestamp.js";
import FileUploader from "./FileUploader.jsx";

export default function RoomMappingEditForm() {
    // We usually don't do this, but this is convenient here.
    const styles = {
        container: "py-6 sm:grid sm:grid-cols-3 sm:gap-4",
        label: "text-sm font-medium text-gray-900",
        value: "mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0",
        inputContainer: "relative rounded-md shadow-sm",
        input: "pr-9 relative block w-full rounded-none border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6",
        roundedTop: "rounded-t-md",
        roundedBottom: "rounded-b-md",
        iconContainer: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
        flagIcon: "size-5",
        descriptionContainer: "flex flex-col gap-5",
        textareaWrapper: "rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
        textarea: "w-full h-16 border-none rounded-t-md text-sm text-gray-800 resize-none",
        textareaFooter: "flex justify-end items-center w-full h-8 px-3 pb-2 gap-3 border-none rounded-b-md text-gray-400",
        abstractCheckableList: "flex flex-col gap-5",
        switchWrapper: "group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600",
        switchThumb: "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5",
        checkboxLabel: "ml-3 text-sm",
        priorityLabel: "block text-sm/6 font-medium text-gray-900",
        priorityInput: "block w-21 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6",
        link: "font-medium text-indigo-600 hover:text-indigo-500",
    };

    const {statuses, roomCategories} = useSettingsContext()

    const {
        name,
        setName,
        shortName,
        setShortName,
        abbr,
        setAbbr,
        description,
        setDescription,
        url,
        setUrl,
        imageUrl,
        priority,
        setPriority,
        virtualRoom,
        setVirtualRoom,
        hiddenByDefault,
        setHiddenByDefault,
        mappingStatus,
        setMappingStatus,
        selectedCategory,
        setSelectedCategory,
        lastUpdateTimestamp,
    } = useRoomMappingFormContext();

    return (
        <dl className="divide-y divide-gray-100 pr-4">
            {/* Name */}
            <div className={styles.container}>
                <dt className={styles.label}>Name</dt>
                <dd className={styles.value}>
                    <fieldset>
                        <div className={styles.inputContainer}>
                            <input
                                id="name-it"
                                name="name-it"
                                type="text"
                                placeholder="Camera Immaginaria"
                                className={classNames(styles.input, styles.roundedTop)}
                                value={name.it}
                                onChange={(e) => setName({...name, it: e.target.value})}
                            />
                            <div className={styles.iconContainer}>
                                <ItalyFlagIcon className={styles.flagIcon}/>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                id="name-en"
                                name="name-en"
                                type="text"
                                placeholder="Imaginary Room"
                                className={classNames(styles.input, styles.roundedBottom)}
                                value={name.en}
                                onChange={(e) => setName({ ...name, en: e.target.value })}
                            />
                            <div className={styles.iconContainer}>
                                <UkFlagIcon className={styles.flagIcon}/>
                            </div>
                        </div>
                    </fieldset>
                </dd>
            </div>

            {/* Short Name */}
            <div className={styles.container}>
                <dt className={styles.label}>Short name</dt>
                <dd className={styles.value}>
                    <fieldset>
                        <div className={styles.inputContainer}>
                            <input
                                id="short-name-it"
                                name="short-name-it"
                                type="text"
                                placeholder="Immaginaria"
                                className={classNames(styles.input, styles.roundedTop)}
                                value={shortName.it}
                                onChange={(e) => setShortName({ ...shortName, it: e.target.value })}
                            />
                            <div className={styles.iconContainer}>
                                <ItalyFlagIcon className={styles.flagIcon}/>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                id="short-name-en"
                                name="short-name-en"
                                type="text"
                                placeholder="Immaginary"
                                className={classNames(styles.input, styles.roundedBottom)}
                                value={shortName.en}
                                onChange={(e) => setShortName({ ...shortName, en: e.target.value })}
                            />
                            <div className={styles.iconContainer}>
                                <UkFlagIcon className={styles.flagIcon}/>
                            </div>
                        </div>
                    </fieldset>
                </dd>
            </div>

            {/* Abbreviation */}
            <div className={styles.container}>
                <dt className={styles.label}>Abbreviation</dt>
                <dd className={styles.value}>
                    <input
                        id="abbr"
                        name="abbr"
                        type="text"
                        placeholder="IMG"
                        className={styles.input}
                        value={abbr}
                        onChange={(e) => setAbbr(e.target.value)}
                    />
                </dd>
            </div>

            {/* Description(s) */}
            <div className={styles.container}>
                <dt>
                    <div
                        className="flex cursor-pointer"
                        onClick={() => alert(
                            "If one description is missing, the other will be used for both languages. If both are missing, a placeholder will be set automatically."
                        )}
                    >
                        <span><InformationCircleIcon className="size-5 text-gray-400"/></span>
                        <span className={styles.label}>Description(s)</span>
                    </div>
                </dt>
                <dd className={styles.value}>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.textareaWrapper}>
                            <textarea
                                id="desc-it"
                                className={styles.textarea}
                                placeholder="Caratteristiche: 1 letto matrimoniale immaginario..."
                                value={description.it}
                                onChange={(e) => setDescription({ ...description, it: e.target.value })}
                            />
                            <div className={styles.textareaFooter}>
                                <ItalyFlagIcon className={styles.flagIcon}/>
                            </div>
                        </div>
                        <div className={styles.textareaWrapper}>
                            <textarea
                                id="desc-en"
                                className={styles.textarea}
                                placeholder="Features: 1 imaginary king-size bed..."
                                value={description.en}
                                onChange={(e) => setDescription({ ...description, en: e.target.value })}
                            />
                            <div className={styles.textareaFooter}>
                                <UkFlagIcon className={styles.flagIcon}/>
                            </div>
                        </div>
                    </div>
                </dd>
            </div>

            {/* Website URL */}
            <div className={styles.container}>
                <dt className={styles.label}>Website URL</dt>
                <dd className={styles.value}>
                    <fieldset>
                        <div className={styles.inputContainer}>
                            <input
                                id="website-url-it"
                                name="website-url-it"
                                type="text"
                                placeholder="https://..."
                                className={classNames(styles.input, styles.roundedTop)}
                                value={url.it}
                                onChange={(e) => setUrl({ ...url, it: e.target.value })}
                            />
                            <div className={styles.iconContainer}>
                                <ItalyFlagIcon aria-hidden="true" className={styles.flagIcon}/>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                id="website-url-en"
                                name="website-url-en"
                                type="text"
                                placeholder="https://..."
                                className={classNames(styles.input, styles.roundedBottom)}
                                value={url.en}
                                onChange={(e) => setUrl({ ...url, en: e.target.value })}
                            />
                            <div className={styles.iconContainer}>
                                <UkFlagIcon aria-hidden="true" className={styles.flagIcon}/>
                            </div>
                        </div>
                    </fieldset>
                </dd>
            </div>

            {/* Picture */}
            <div className={styles.container}>
                <dt className={styles.label}>Picture</dt>
                    <dd className={classNames(styles.value, "mt-2 text-gray-900")}>
                        <FileUploader />
                    </dd>
            </div>

            {/* Categories */}
            <div className={styles.container}>
                <dt className={styles.label}>Categories</dt>
                <dd className={styles.value}>
                    <AbstractCheckableList
                        options={roomCategories}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        displayKey="name"
                        idKey="id"
                        placeholder="Category..."
                    />
                </dd>
            </div>

            {/* Visibility section (virtual room, hidden by default, priority */}
            <div className={styles.container}>
                <dt className={styles.label}>Visibility</dt>
                <dd className={styles.value}>
                    <div className={styles.abstractCheckableList}>
                        <Field className="flex items-center">
                            <Switch
                                checked={virtualRoom}
                                onChange={setVirtualRoom}
                                className={styles.switchWrapper}
                            >
                                <span aria-hidden="true" className={styles.switchThumb}/>
                            </Switch>
                            <Label as="span" className={styles.checkboxLabel}>
                                <span className="text-gray-900">Virtual Room</span>
                            </Label>
                        </Field>
                        <Field className="flex items-center">
                            <Switch
                                checked={hiddenByDefault}
                                onChange={setHiddenByDefault}
                                className={styles.switchWrapper}
                            >
                                <span aria-hidden="true" className={styles.switchThumb}/>
                            </Switch>
                            <Label as="span" className={styles.checkboxLabel}>
                                <span className="text-gray-900">Hidden by default</span>
                            </Label>
                        </Field>
                        <div className="flex flex-col">
                            <label htmlFor="priority" className={styles.priorityLabel}>
                                Priority
                            </label>
                            <div className="mt-2">
                                <input
                                    id="priority"
                                    name="priority"
                                    type="number"
                                    className={styles.priorityInput}
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </dd>
            </div>

            {/* Mapping Status */}
            <div className={styles.container}>
                <dt className={styles.label}>Mapping status</dt>
                <dd className={styles.value}>
                    <AbstractCheckableList
                        options={statuses}
                        value={mappingStatus}
                        onChange={setMappingStatus}
                        displayKey="name"
                        idKey="id"
                        placeholder="Mapping status..."
                    />
                </dd>
            </div>

            <div className={styles.container}>
                <dt className={styles.label}>Last updated</dt>
                <dd className="text-sm">
                    {formatUnixTimestamp(lastUpdateTimestamp, "en-UK", { weekday: 'long' })}
                </dd>
            </div>
        </dl>
    )
}
