import {useSettingsContext} from "../../context/SettingsContext.jsx";
import LoadingIcon from "../../assets/LoadingIcon.jsx";
import MappingStatusBadge from "./MappingStatusBadge.jsx";
import {Link} from "react-router-dom";
import {PlusSmallIcon} from "@heroicons/react/20/solid/index.js";
import {useState} from "react";
import {useRateMappingContext} from "../../context/RateMappingFormContext.jsx";
import {useNavigate} from "react-router";

export default function MappingRatesList() {
    const { ratesMetadata, isError, isFetching, refetch } = useSettingsContext()
    const { addRate } = useRateMappingContext()

    const [filterCriteria, setFilterCriteria] = useState(null);
    const [sortCriteria, setSortCriteria] = useState(null);

    const navigate = useNavigate()
    function handleAddRate() {
        let newRateId = prompt("Enter the ID for the new rate. It is recommended to use numbers only.")
        if (!newRateId) return;

        addRate(newRateId).then(() => {
            refetch()
            navigate(`/settings/rates/${newRateId}`)
        });
    }

    if (isFetching || isError || !ratesMetadata) {
        return(
            <div className="flex justify-center">
                <LoadingIcon className="w-7 h-auto" />
            </div>
        )
    }

    const processedRates = () => {
        if (!ratesMetadata) return [];

        let filteredRates = ratesMetadata;

        if (filterCriteria === "provisional") {
            filteredRates = ratesMetadata.filter(
                ([, rateDetails]) => rateDetails.mapping_status === "provisional"
            );
        }

        if (sortCriteria === "rateId") {
            filteredRates = [...filteredRates].sort(([a], [b]) => a.localeCompare(b));

        } else if (sortCriteria === "name") {
            filteredRates = [...filteredRates].sort(([, aDetails], [, bDetails]) =>
                (aDetails.name || "").localeCompare(bDetails.name || "")
            );

        } else if (sortCriteria === "priority") {
            filteredRates = [...filteredRates].sort(([, aDetails], [, bDetails]) =>
                (bDetails.priority || 0) - (aDetails.priority || 0)
            );
        }

        return filteredRates;
    };

    if (isFetching || isError || !ratesMetadata) {
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
                    <h1 className="text-base/7 font-semibold text-gray-900">Rate Mapping</h1>
                    <div
                        className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7">
                        <button
                            className="text-gray-500 hover:text-indigo-600"
                            onClick={() => {
                                setFilterCriteria(null);
                                setSortCriteria("rateId");
                            }}
                        >
                            Rate ID
                        </button>
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
                                setSortCriteria("priority");
                            }}
                        >
                            Priority
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
                        onClick={handleAddRate}
                    >
                        <PlusSmallIcon aria-hidden="true" className="-ml-1.5 size-5"/>
                        New rate
                    </button>
                </div>
            </div>
            <dl className="space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                {processedRates().map(([rateId, rateDetails]) => (
                    <div key={rateId} className="pt-6 sm:flex">
                        <dt className="text-gray-900 sm:w-21 sm:flex-none sm:pr-6">
                            {rateId}
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900 flex gap-3">
                                <span className="font-medium">{rateDetails.name || "Unnamed Rate"}</span>
                                <MappingStatusBadge id={rateDetails.mapping_status}/>
                            </div>
                            <Link
                                type="button"
                                to={rateId}
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                                viewTransition
                            >
                                Mapping
                            </Link>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
