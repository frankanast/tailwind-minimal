import {
    UkFlagIcon,
    ItalyFlagIcon,
} from "../../assets/icons/countryFlags.jsx";
import {InformationCircleIcon} from "@heroicons/react/16/solid/index.js";
import AbstractCheckableList from "../abstract/AbstractCheckableList.jsx";
import {Field, Label, Switch} from "@headlessui/react";
import {useSettingsContext} from "../../context/SettingsContext.jsx";
import classNames from "../../utils/classNames.js";
import formatUnixTimestamp from "../../utils/formatUnixTimestamp.js";
import mappingFormStyles from "../../assets/styles/mappingFormStyles.js";
import {useRateMappingContext} from "../../context/RateMappingFormContext.jsx";

export default function RateMappingForm() {
    const {statuses, rateCategories} = useSettingsContext()

    const {
        name,
        setName,
        abbr,
        setAbbr,
        publicName,
        setPublicName,
        selectedCategory,
        setSelectedCategory,
        isPackage,
        setIsPackage,
        includes,
        setIncludes,
        isPrivateSale,
        setIsPrivateSale,
        cxlPolicy,
        setCxlPolicy,
        rateMappingStatus,
        setRateMappingStatus,
        priority,
        setPriority,
        lastUpdateTimestamp,
    } = useRateMappingContext();

    return (
        <dl className="divide-y divide-gray-100 pr-4">
            {/*/!* Name *!/*/}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Internal name</dt>
                <dd className={mappingFormStyles.value}>
                    <fieldset>
                        <div className={mappingFormStyles.inputContainer}>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className={classNames(mappingFormStyles.input, mappingFormStyles.roundedTop, mappingFormStyles.roundedBottom)}
                                value={name.it}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </fieldset>
                </dd>
            </div>

            {/*/!* Public name *!/*/}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Public name</dt>
                <dd className={mappingFormStyles.value}>
                    <fieldset>
                        <div className={mappingFormStyles.inputContainer}>
                            <input
                                id="public-name-it"
                                name="public-name-it"
                                type="text"
                                className={classNames(mappingFormStyles.input, mappingFormStyles.roundedTop)}
                                value={publicName.it}
                                onChange={(e) => setPublicName({...publicName, it: e.target.value})}
                            />
                            <div className={mappingFormStyles.iconContainer}>
                                <ItalyFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                        <div className={mappingFormStyles.inputContainer}>
                            <input
                                id="public-name-en"
                                name="public-name-en"
                                type="text"
                                placeholder="Imaginary Rate"
                                className={classNames(mappingFormStyles.input, mappingFormStyles.roundedBottom)}
                                value={publicName.en}
                                onChange={(e) => setPublicName({ ...publicName, en: e.target.value })}
                            />
                            <div className={mappingFormStyles.iconContainer}>
                                <UkFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                    </fieldset>
                </dd>
            </div>

            {/*/!* Abbreviation *!/*/}
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

            {/* Categories */}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Categories</dt>
                <dd className={mappingFormStyles.value}>
                    <AbstractCheckableList
                        options={rateCategories}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        displayKey="name"
                        idKey="id"
                        placeholder="Category..."
                    />
                </dd>
            </div>

            {/*/!* Inclusions *!/*/}
            <div className={mappingFormStyles.container}>
                <dt>
                    <div
                        className="flex cursor-pointer"
                        onClick={() => alert(
                            "This field is only required for package rates. Please include a package rate description with all the included services."
                        )}
                    >
                        <span><InformationCircleIcon className="size-5 text-gray-400"/></span>
                        <span className={mappingFormStyles.label}>Services included</span>
                    </div>
                </dt>
                <dd className={mappingFormStyles.value}>
                    <div className={mappingFormStyles.descriptionContainer}>
                        <div className={mappingFormStyles.textareaWrapper}>
                            <textarea
                                id="incl-it"
                                className={mappingFormStyles.textarea}
                                placeholder="Il pacchetto include: ..."
                                value={includes.it}
                                onChange={(e) => setIncludes({ ...includes, it: e.target.value })}
                            />
                            <div className={mappingFormStyles.textareaFooter}>
                                <ItalyFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>

                        <div className={mappingFormStyles.textareaWrapper}>
                            <textarea
                                id="incl-en"
                                className={mappingFormStyles.textarea}
                                placeholder="The Package rate includes: ..."
                                value={includes.en}
                                onChange={(e) => setIncludes({ ...includes, en: e.target.value })}
                            />
                            <div className={mappingFormStyles.textareaFooter}>
                                <UkFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                    </div>
                </dd>
            </div>

            {/* Cancellation policy */}
            <div className={mappingFormStyles.container}>
                <dt>
                    <div>
                        <span className={mappingFormStyles.label}>Cancellation policy</span>
                    </div>
                </dt>
                <dd className={mappingFormStyles.value}>
                    <div className={mappingFormStyles.descriptionContainer}>
                        <div className={mappingFormStyles.textareaWrapper}>
                            <textarea
                                id="cxl-policy-it"
                                className={mappingFormStyles.textarea}
                                placeholder="Cancellabile fino a X giorni prima dell'arrivo..."
                                value={cxlPolicy.it}
                                onChange={(e) => setCxlPolicy({ ...cxlPolicy, it: e.target.value })}
                            />
                            <div className={mappingFormStyles.textareaFooter}>
                                <ItalyFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>

                        <div className={mappingFormStyles.textareaWrapper}>
                            <textarea
                                id="cxl-policy-en"
                                className={mappingFormStyles.textarea}
                                placeholder="Free cancellation until 21 days before arrival..."
                                value={cxlPolicy.en}
                                onChange={(e) => setCxlPolicy({ ...cxlPolicy, en: e.target.value })}
                            />
                            <div className={mappingFormStyles.textareaFooter}>
                                <UkFlagIcon className={mappingFormStyles.flagIcon}/>
                            </div>
                        </div>
                    </div>
                </dd>
            </div>

            {/* Visibility section (virtual room, hidden by default, priority */}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Visibility</dt>
                <dd className={mappingFormStyles.value}>
                    <div className={mappingFormStyles.abstractCheckableList}>
                        <Field className="flex items-center">
                            <Switch
                                checked={isPackage}
                                onChange={setIsPackage}
                                className={mappingFormStyles.switchWrapper}
                            >
                                <span aria-hidden="true" className={mappingFormStyles.switchThumb}/>
                            </Switch>
                            <Label as="span" className={mappingFormStyles.checkboxLabel}>
                                <span className="text-gray-900">Package rate</span>
                            </Label>
                        </Field>
                        <Field className="flex items-center">
                            <Switch
                                checked={isPrivateSale}
                                onChange={setIsPrivateSale}
                                className={mappingFormStyles.switchWrapper}
                            >
                                <span aria-hidden="true" className={mappingFormStyles.switchThumb}/>
                            </Switch>
                            <Label as="span" className={mappingFormStyles.checkboxLabel}>
                                <span className="text-gray-900">Private sale</span>
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
                        value={rateMappingStatus}
                        onChange={setRateMappingStatus}
                        displayKey="name"
                        idKey="id"
                        placeholder="Mapping status..."
                    />
                </dd>
            </div>

            {/* Last update */}
            <div className={mappingFormStyles.container}>
                <dt className={mappingFormStyles.label}>Last updated</dt>
                <dd className="text-sm">
                    {formatUnixTimestamp(lastUpdateTimestamp, "en-UK", { weekday: 'long' })}
                </dd>
            </div>
        </dl>
    )
}
