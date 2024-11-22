import {useSettingsContext} from "./SettingsContext.jsx";
import LoadingIcon from "../../assets/LoadingIcon.jsx";
import MappingStatusBadge from "./MappingStatusBadge.jsx";

export default function MappingRatesList() {
    const { ratesMetadata, isError, isFetching } = useSettingsContext();
    if (isFetching || isError || !ratesMetadata) {
        return <LoadingIcon height={12} width={12} />
    }

    return (
        <dl className="space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            {ratesMetadata.map(([rateId, rateDetails]) => (
                <div key={rateId} className="pt-6 sm:flex">
                    <dt className="text-gray-900 sm:w-21 sm:flex-none sm:pr-6">
                        {rateId}
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-gray-900 flex gap-3">
                            <span className="font-medium">{rateDetails.name ? `${rateDetails.name} (${rateDetails.abbr})` : ""}</span>
                            <MappingStatusBadge id={rateDetails.mapping_status} />
                        </div>
                        <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Mapping
                        </button>
                    </dd>
                </div>
            ))}
        </dl>
    );
}
