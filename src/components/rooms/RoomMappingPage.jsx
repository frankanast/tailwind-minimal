import RoomMappingForm from "./RoomMappingForm.jsx";
import CommitIcon from "../../assets/icons/CommitIcon.jsx";
import {useRoomMappingContext} from "../../context/RoomMappingFormContext.jsx";
import {useNavigate, useParams} from "react-router";
import {useEffect} from "react";
import formatUnixTimestamp from "../../utils/formatUnixTimestamp.js";
import {ArrowUturnLeftIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import {useSettingsContext} from "../../context/SettingsContext.jsx";

export default function RoomMappingPage() {
    const {
        isCurrentlyEditing,
        setIsCurrentlyEditing,
        shortName,
        imageUrl,
        resetForm,
        commitChanges,
        deleteRoom,
        lastUpdateTimestamp,
    } = useRoomMappingContext();

    const {refetch} = useSettingsContext()

    let params = useParams();
    let navigate = useNavigate();

    function handleCommit() {
        commitChanges().then(() => {
            refetch()
            resetForm()
            navigate('/rooms')
        });
    }

    function handleDelete() {
        if (confirm(
            `
            Important: This action is irreversible. 
            Once a room is deleted, it cannot be restored. 
            We recommend using the 'mapping status' feature to mark rooms as unusable instead of deleting them. 
            Are you sure you want to proceed?
            `
        ) === true) {
            deleteRoom().then(() => {
                refetch()
                resetForm()
                navigate('/rooms')
            });
        }
    }

    useEffect(() => {
        setIsCurrentlyEditing(params.roomId || "999")

    })

    return (
        <div className="flex flex-col items-center justify-center p-4 text-center sm:p-0">
            <div className="sm:flex sm:items-start">
                <div className="w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                    {/* Header */}
                    <div className="my-10 md:flex md:items-center md:justify-between md:space-x-5">
                        <div className="flex items-start space-x-5">
                            <div className="shrink-0">
                                <div className="relative">
                                    <img
                                        alt=""
                                        src={imageUrl || "https://programmino-be.onrender.com/download_pic/1c5e9959-d53f-4c19-9117-9ffb64dcb899.png"}
                                        className="size-16 rounded-md bg-gray-50"
                                    />
                                    <span aria-hidden="true" className="absolute inset-0 rounded-md shadow-inner"/>
                                </div>
                            </div>
                            {/*
                              Use vertical padding to simulate center alignment when both lines of text are one line,
                              but preserve the same layout if the text wraps without making the image jump around.
                            */}
                            <div className="pt-1.5">
                                <h1 className="text-2xl font-bold text-gray-900">{shortName.en || shortName.it} ({isCurrentlyEditing || "?"})</h1>
                                <p className="text-sm font-medium text-gray-500">
                                    {
                                        (lastUpdateTimestamp === 0)
                                            ? `Last updated ${formatUnixTimestamp(lastUpdateTimestamp, "en-UK", {weekday: 'long'})}`
                                            : "⚠️ Update required."
                                    }
                                </p>
                            </div>
                        </div>
                        <div
                            className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                            <Link
                                type="button"
                                to="/rooms"
                                className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                viewTransition
                            >
                                <ArrowUturnLeftIcon className="-ml-0.5 mr-1.5 size-5 text-gray-400"/>
                                Back to Rooms
                            </Link>
                        </div>
                    </div>
                    <RoomMappingForm/>
                    <div className="flex gap-3 justify-between mt-20 mb-6">

                        <span className="hidden sm:block">
                                <button
                                    className="inline-flex items-center justify-center rounded-md bg-chestnut-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-chestnut-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chestnut-600"
                                    type="button"
                                    onClick={handleDelete}
                                >
                                    <XMarkIcon className="-ml-0.5 mr-1.5 size-5 text-white"/>
                                    Delete this room
                                </button>
                            </span>

                        <div className="flex gap-3">
                            <span className="hidden sm:block">
                                <Link
                                    to="/rooms"
                                    className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    type="button"
                                    viewTransition
                                >
                                    Cancel
                                </Link>
                            </span>

                            <span className="hidden sm:block">
                                <button
                                    type="button"
                                    onClick={handleCommit}
                                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <CommitIcon className="-ml-0.5 mr-1.5 size-5 text-white"/>
                                    Save changes
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
