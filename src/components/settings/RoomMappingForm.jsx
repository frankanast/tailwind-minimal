import ItalyFlagIcon from "../../assets/ItalyFlagIcon.jsx";
import UkFlagIcon from "../../assets/UkFlagIcon.jsx";
import {InformationCircleIcon} from "@heroicons/react/16/solid/index.js";
import AbstractCheckableList from "../abstract/AbstractCheckableList.jsx";
import {Field, Label, Switch} from "@headlessui/react";
import {useSettingsContext} from "../../context/SettingsContext.jsx";
import {useRoomMappingContext} from "../../context/RoomMappingFormContext.jsx";
import classNames from "../../utils/classNames.js";
import formatUnixTimestamp from "../../utils/formatUnixTimestamp.js";
import FileUploader from "./FileUploader.jsx";
import mappingFormStyles from "./mappingFormStyles.js";

export default function RoomMappingForm() {
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
        // imageUrl,
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
    } = useRoomMappingContext();

    return (
        <dl className="divide-y divide-gray-100 pr-4">
            {/* Name */}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Name</dt>
                <dd className={mappingFormStyles.value}>
                    <fieldset>
                        <div className={mappingFormStyles.inputContainer}>
                            <input
                                id="name-it"
                                name="name-it"
                                type="text"
                                placeholder="Camera Immaginaria"
                                className={classNames(mappingFormStyles.input, mappingFormStyles.roundedTop)}
                                value={name.it}
                                onChange={(e) => setName({...name, it: e.target.value})}
                            />
                            <div className={mappingFormStyles.iconContainer}>
                                <ItalyFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                        <div className={mappingFormStyles.inputContainer}>
                            <input
                                id="name-en"
                                name="name-en"
                                type="text"
                                placeholder="Imaginary Room"
                                className={classNames(mappingFormStyles.input, mappingFormStyles.roundedBottom)}
                                value={name.en}
                                onChange={(e) => setName({ ...name, en: e.target.value })}
                            />
                            <div className={mappingFormStyles.iconContainer}>
                                <UkFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                    </fieldset>
                </dd>
            </div>

            {/* Short Name */}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Short name</dt>
                <dd className={mappingFormStyles.value}>
                    <fieldset>
                        <div className={mappingFormStyles.inputContainer}>
                            <input
                                id="short-name-it"
                                name="short-name-it"
                                type="text"
                                placeholder="Immaginaria"
                                className={classNames(mappingFormStyles.input, mappingFormStyles.roundedTop)}
                                value={shortName.it}
                                onChange={(e) => setShortName({ ...shortName, it: e.target.value })}
                            />
                            <div className={mappingFormStyles.iconContainer}>
                                <ItalyFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                        <div className={mappingFormStyles.inputContainer}>
                            <input
                                id="short-name-en"
                                name="short-name-en"
                                type="text"
                                placeholder="Immaginary"
                                className={classNames(mappingFormStyles.input, mappingFormStyles.roundedBottom)}
                                value={shortName.en}
                                onChange={(e) => setShortName({ ...shortName, en: e.target.value })}
                            />
                            <div className={mappingFormStyles.iconContainer}>
                                <UkFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                    </fieldset>
                </dd>
            </div>

            {/* Abbreviation */}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Abbreviation</dt>
                <dd className={mappingFormStyles.value}>
                    <input
                        id="abbr"
                        name="abbr"
                        type="text"
                        placeholder="IMG"
                        className={mappingFormStyles.input}
                        value={abbr}
                        onChange={(e) => setAbbr(e.target.value)}
                    />
                </dd>
            </div>

            {/* Description(s) */}
            <div className={mappingFormStyles.container}>
                <dt>
                    <div
                        className="flex cursor-pointer"
                        onClick={() => alert(
                            "If one description is missing, the other will be used for both languages. If both are missing, a placeholder will be set automatically."
                        )}
                    >
                        <span><InformationCircleIcon className="size-5 text-gray-400"/></span>
                        <span className={mappingFormStyles.label}>Description(s)</span>
                    </div>
                </dt>
                <dd className={mappingFormStyles.value}>
                    <div className={mappingFormStyles.descriptionContainer}>
                        <div className={mappingFormStyles.textareaWrapper}>
                            <textarea
                                id="desc-it"
                                className={mappingFormStyles.textarea}
                                placeholder="Caratteristiche: 1 letto matrimoniale immaginario..."
                                value={description.it}
                                onChange={(e) => setDescription({ ...description, it: e.target.value })}
                            />
                            <div className={mappingFormStyles.textareaFooter}>
                                <ItalyFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                        <div className={mappingFormStyles.textareaWrapper}>
                            <textarea
                                id="desc-en"
                                className={mappingFormStyles.textarea}
                                placeholder="Features: 1 imaginary king-size bed..."
                                value={description.en}
                                onChange={(e) => setDescription({ ...description, en: e.target.value })}
                            />
                            <div className={mappingFormStyles.textareaFooter}>
                                <UkFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                    </div>
                </dd>
            </div>

            {/* Website URL */}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Website URL</dt>
                <dd className={mappingFormStyles.value}>
                    <fieldset>
                        <div className={mappingFormStyles.inputContainer}>
                            <input
                                id="website-url-it"
                                name="website-url-it"
                                type="text"
                                placeholder="https://..."
                                className={classNames(mappingFormStyles.input, mappingFormStyles.roundedTop)}
                                value={url.it}
                                onChange={(e) => setUrl({ ...url, it: e.target.value })}
                            />
                            <div className={mappingFormStyles.iconContainer}>
                                <ItalyFlagIcon aria-hidden="true" className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                        <div className={mappingFormStyles.inputContainer}>
                            <input
                                id="website-url-en"
                                name="website-url-en"
                                type="text"
                                placeholder="https://..."
                                className={classNames(mappingFormStyles.input, mappingFormStyles.roundedBottom)}
                                value={url.en}
                                onChange={(e) => setUrl({ ...url, en: e.target.value })}
                            />
                            <div className={mappingFormStyles.iconContainer}>
                                <UkFlagIcon aria-hidden="true" className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                    </fieldset>
                </dd>
            </div>

            {/* Picture */}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Picture</dt>
                    <dd className={classNames(mappingFormStyles.value, "mt-2 text-gray-900")}>
                        <FileUploader />
                    </dd>
            </div>

            {/* Categories */}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Categories</dt>
                <dd className={mappingFormStyles.value}>
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
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Visibility</dt>
                <dd className={mappingFormStyles.value}>
                    <div className={mappingFormStyles.abstractCheckableList}>
                        <Field className="flex items-center">
                            <Switch
                                checked={virtualRoom}
                                onChange={setVirtualRoom}
                                className={mappingFormStyles.switchWrapper}
                            >
                                <span aria-hidden="true" className={mappingFormStyles.switchThumb}/>
                            </Switch>
                            <Label as="span" className={mappingFormStyles.checkboxLabel}>
                                <span className="text-gray-900">Virtual Room</span>
                            </Label>
                        </Field>
                        <Field className="flex items-center">
                            <Switch
                                checked={hiddenByDefault}
                                onChange={setHiddenByDefault}
                                className={mappingFormStyles.switchWrapper}
                            >
                                <span aria-hidden="true" className={mappingFormStyles.switchThumb}/>
                            </Switch>
                            <Label as="span" className={mappingFormStyles.checkboxLabel}>
                                <span className="text-gray-900">Hidden by default</span>
                            </Label>
                        </Field>
                        <div className="flex flex-col">
                            <label htmlFor="priority" className={mappingFormStyles.priorityLabel}>
                                Priority
                            </label>
                            <div className="mt-2">
                                <input
                                    id="priority"
                                    name="priority"
                                    type="number"
                                    className={mappingFormStyles.priorityInput}
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </dd>
            </div>

            {/* Mapping Status */}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Mapping status</dt>
                <dd className={mappingFormStyles.value}>
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

            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Last updated</dt>
                <dd className="text-sm">
                    {formatUnixTimestamp(lastUpdateTimestamp, "en-UK", { weekday: 'long' })}
                </dd>
            </div>
        </dl>
    )
}
