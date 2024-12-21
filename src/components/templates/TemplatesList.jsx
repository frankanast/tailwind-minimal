import LoadingIcon from "../../assets/icons/LoadingIcon.jsx";
import MappingStatusBadge from "../abstract/MappingStatusBadge.jsx";
import {ChevronRightIcon} from "@heroicons/react/20/solid/index.js";
import {useState} from "react";
import {NavLink} from "react-router-dom";
import {useSettingsContext} from "../../context/SettingsContext.jsx";
import formatUnixTimestamp from "../../utils/formatUnixTimestamp.js";
import {ChevronDownIcon} from "@heroicons/react/16/solid";

export default function TemplatesList() {
    const {templatesMetadata, isError, isFetching, refetch} = useSettingsContext()
    const [filterCriteria, setFilterCriteria] = useState(null);
    const [sortCriteria, setSortCriteria] = useState(null);

    const processedTemplates = () => {
        if (!templatesMetadata) return [];

        let filteredTemplates = templatesMetadata;

        if (filterCriteria === "provisional" || filterCriteria === "draft") {
            filteredTemplates = templatesMetadata.filter(
                ([, templateDetails]) => templateDetails.status === "provisional"
            );
        }

        if (sortCriteria === "name") {
            filteredTemplates = [...filteredTemplates].sort(([, aDetails], [, bDetails]) =>
                (aDetails.name || "").localeCompare(bDetails.name || "")
            );
        } else if (sortCriteria === "status") {
            filteredTemplates = [...filteredTemplates].sort(([, aDetails], [, bDetails]) =>
                (aDetails.status || 0) - (bDetails.status || 0)
            );
        }

        return filteredTemplates;
    };

    return (
        <>
            {/* Mobile: Dropdown */}
            <div className="grid grid-cols-1 sm:hidden">
                <select
                    defaultValue="Design"
                    aria-label="Select a tab"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white
                       py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1
                       outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2
                       focus:outline-indigo-600"
                >
                    {templatesMetadata.map((templateDetails) => (
                        <option key={templateDetails.name}>{templateDetails.name}</option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5
                       self-center justify-self-end fill-gray-500"
                />
            </div>

            {/* Desktop: Tabs */}
            <div className="hidden sm:block">
                <ul role="list" className="divide-y divide-gray-100">
                    {processedTemplates().map(([templateId, templateDetails]) => (
                        <li
                            key={templateId}
                            className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm/6 font-semibold text-gray-900">
                                        <NavLink to={`/templates/${templateId}`}>
                                            <span className="absolute inset-x-0 -top-px bottom-0"/>
                                            {templateDetails.name}
                                        </NavLink>
                                    </p>
                                    <p className="mt-1 flex text-xs/5 text-gray-500">
                                        <NavLink to={`/templates/${templateId}`}
                                                 className="relative truncate hover:underline">
                                            <span
                                                className="font-mono">{templateDetails.code}</span> ▪ {formatUnixTimestamp(templateDetails.lastUpdate)}
                                        </NavLink>
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-4">
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                    <MappingStatusBadge id={templateDetails.status}/>

                                </div>
                                <ChevronRightIcon aria-hidden="true" className="size-5 flex-none text-gray-400"/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
