import {useSettingsContext} from "../../context/SettingsContext.jsx";
import LoadingIcon from "../../assets/LoadingIcon.jsx";
import MappingStatusBadge from "./MappingStatusBadge.jsx";
import {useRateMappingContext} from "../../context/RateMappingFormContext.jsx";

export default function MappingRatesList() {
    const {ratesMetadata, isError, isFetching, setMappingDialogIsOpen} = useSettingsContext()
    const {setIsCurrentlyEditingRate} = useRateMappingContext()

    function handleOpenRateMapping(id_) {
        setIsCurrentlyEditingRate(id_)
        setMappingDialogIsOpen(true)
    }

    if (isFetching || isError || !ratesMetadata) {
        return(
            <div className="flex justify-center">
                <LoadingIcon className="w-7 h-auto" />
            </div>
        )
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
                            <span className="font-medium">{rateDetails.name || "Unnamed Rate"} {`(${rateDetails.abbr || ""})`}</span>
                            <MappingStatusBadge id={rateDetails.mapping_status}/>
                        </div>
                        <button
                            type="button"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                            onClick={() => {handleOpenRateMapping(rateId)}}
                        >
                            Mapping
                        </button>
                    </dd>
                </div>
            ))}
        </dl>
    )
}
