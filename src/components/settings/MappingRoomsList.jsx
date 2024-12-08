import {useSettingsContext} from "../../context/SettingsContext.jsx";
import LoadingIcon from "../../assets/LoadingIcon.jsx";
import MappingStatusBadge from "./MappingStatusBadge.jsx";
import {Link} from "react-router-dom";
import {PlusSmallIcon} from "@heroicons/react/20/solid/index.js";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useRoomMappingContext} from "../../context/RoomMappingFormContext.jsx";

export default function MappingRoomsList() {
    const {roomsMetadata, isError, isFetching, refetch} = useSettingsContext()
    const {addRoom} = useRoomMappingContext()

    const [filterCriteria, setFilterCriteria] = useState(null);
    const [sortCriteria, setSortCriteria] = useState(null);

    const processedRooms = () => {
        if (!roomsMetadata) return [];

        let filteredRooms = roomsMetadata;

        if (filterCriteria === "provisional") {
            filteredRooms = roomsMetadata.filter(
                ([, roomDetails]) => roomDetails.mapping_status === "provisional"
            );
        }

        if (sortCriteria === "roomId") {
            filteredRooms = [...filteredRooms].sort(([a], [b]) => a.localeCompare(b));
        } else if (sortCriteria === "name") {
            filteredRooms = [...filteredRooms].sort(([, aDetails], [, bDetails]) =>
                (aDetails.name?.en || "").localeCompare(bDetails.name?.en || "")
            );
        } else if (sortCriteria === "priority") {
            filteredRooms = [...filteredRooms].sort(([, aDetails], [, bDetails]) =>
                (bDetails.priority || 0) - (aDetails.priority || 0)
            );
        }

        return filteredRooms;
    };

    const navigate = useNavigate()
    function handleAddRoom() {
        let newRoomId = prompt("Enter the ID for the new room. It is recommended to use numbers only.")
        if (!newRoomId) return;

        addRoom(newRoomId).then(() => {
            refetch()
            navigate(`/settings/rooms/${newRoomId}`)
        });
    }

    if (isFetching || isError || !roomsMetadata) {
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
                    <h1 className="text-base/7 font-semibold text-gray-900">Room Mapping</h1>
                    <div
                        className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7">
                        <button
                            className="text-gray-500 hover:text-indigo-600"
                            onClick={() => {
                                setFilterCriteria(null);
                                setSortCriteria("roomId");
                            }}
                        >
                            Room ID
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
                        onClick={handleAddRoom}
                    >
                        <PlusSmallIcon aria-hidden="true" className="-ml-1.5 size-5"/>
                        New room
                    </button>
                </div>
            </div>
            <dl className="space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                {processedRooms().map(([roomId, roomDetails]) => (
                    <div key={roomId} className="pt-6 sm:flex">
                        <dt className="text-gray-900 sm:w-21 sm:flex-none sm:pr-6">
                            {roomId}
                        </dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900 flex gap-3">
                                <span className="font-medium">{roomDetails.name?.en || "Unnamed Room"}</span>
                                <MappingStatusBadge id={roomDetails.mapping_status}/>
                            </div>
                            <Link
                                type="button"
                                to={roomId}
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
