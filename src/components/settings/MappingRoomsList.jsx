import {useSettingsContext} from "../../context/SettingsContext.jsx";
import LoadingIcon from "../../assets/LoadingIcon.jsx";
import MappingStatusBadge from "./MappingStatusBadge.jsx";
import {useRoomMappingFormContext} from "../../context/RoomMappingFormContext.jsx";

export default function MappingRoomsList() {
    const {roomsMetadata, isError, isFetching, setMappingDialogIsOpen} = useSettingsContext()
    const {setIsCurrentlyEditing} = useRoomMappingFormContext()

    function handleOpenRoomMapping(id_) {
        setIsCurrentlyEditing(id_)
        setMappingDialogIsOpen(true)
    }

    if (isFetching || isError || !roomsMetadata) {
        return(
            <div className="flex justify-center">
                <LoadingIcon className="w-7 h-auto" />
            </div>
        )
    }

    return (
        <dl className="space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            {roomsMetadata.map(([roomId, roomDetails]) => (
                <div key={roomId} className="pt-6 sm:flex">
                    <dt className="text-gray-900 sm:w-21 sm:flex-none sm:pr-6">
                        {roomId}
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-gray-900 flex gap-3">
                            <span className="font-medium">{roomDetails.name?.en || "Unnamed Room"}</span>
                            <MappingStatusBadge id={roomDetails.mapping_status}/>
                        </div>
                        <button
                            type="button"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                            onClick={() => {handleOpenRoomMapping(roomId)}}
                        >
                            Mapping
                        </button>
                    </dd>
                </div>
            ))}
        </dl>
    )
}
