import LoadingIcon from "../../assets/icons/LoadingIcon.jsx";
import MappingStatusBadge from "../abstract/MappingStatusBadge.jsx";
import {PlusSmallIcon} from "@heroicons/react/20/solid/index.js";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSettingsContext} from "../../context/SettingsContext.jsx";
import {useTemplateContext} from "../../context/TemplatesContext.jsx";

export default function TemplatesList() {
    const {templatesMetadata, isError, isFetching, refetch} = useSettingsContext()
    const {addTemplate} = useTemplateContext()

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

    const navigate = useNavigate()
    function handleAddTemplate() {
        let newTemplateCode = prompt(
            "Enter a code ID for the new template. It is recommended to end the code with the 2-digit year of validity, i.e.: testTemplate25."
        )
        if (!newTemplateCode) return;

        addTemplate(newTemplateCode).then(() => {
            refetch()
            navigate(`/templates/${newTemplateCode}`)
        });
    }

    if (isFetching || isError || !templatesMetadata) {
        return(
            <div className="flex justify-center">
                <LoadingIcon className="w-7 h-auto" />
            </div>
        )
    }

    return (
        <div className="flex flex-col max-w-6xl mx-auto">
            <div>
                <div className="flex flex-wrap items-center my-16 gap-6 sm:flex-nowrap">
                    <h1 className="text-base/7 font-semibold text-gray-900">Templates</h1>
                    <div
                        className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7">
                        <button
                            className="text-gray-500 hover:text-indigo-600"
                            onClick={() => {
                                setFilterCriteria(null);
                                setSortCriteria("name");
                            }}
                        >
                            Name
                        </button>
                        <button
                            className="text-gray-500 hover:text-indigo-600"
                            onClick={() => {
                                setFilterCriteria(null);
                                setSortCriteria("status");
                            }}
                        >
                            Status
                        </button>
                        <button
                            className="text-gray-500 hover:text-indigo-600"
                            onClick={() => {
                                setFilterCriteria("provisional");
                                setSortCriteria(null);
                            }}
                        >
                            Only provisional
                        </button>
                    </div>
                    <button
                        className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleAddTemplate}
                    >
                        <PlusSmallIcon aria-hidden="true" className="-ml-1.5 size-5"/>
                        New Template
                    </button>
                </div>
            </div>
            <dl className="space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                {processedTemplates().map(([templateId, templateDetails]) => (
                    <div key={templateId} className="pt-6 sm:flex">
                        <dt className="text-gray-900 sm:w-21 sm:flex-none sm:pr-6 font-mono">
                            {templateId}
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900 flex gap-3">
                                <span className="font-medium">{templateDetails.name || "Unnamed Template"}</span>
                                <MappingStatusBadge id={templateDetails.status}/>
                            </div>
                            <Link
                                type="button"
                                to={`${templateId}`}
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                                viewTransition
                            >
                                Edit
                            </Link>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
