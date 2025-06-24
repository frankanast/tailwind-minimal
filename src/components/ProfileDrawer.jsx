import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {useAuthContext} from "../context/AuthContext.jsx";
import {Fragment} from "react";
import getInitials from "../utils/getInitials.js";
import formatDate from "../utils/formatDate.js";
import {CheckBadgeIcon} from "@heroicons/react/16/solid";

const fieldLabels = {
    "name": {label: "Name", fallback: ""},
    "surname": {label: "Surname", fallback: ""},
    "bio": {label: "Bio", fallback: "This user has not published their bio yet"},
    "position": {label: "Position", fallback: "Unknown"},
    "department": {label: "Department", fallback: "Unknown"},
    "email": {label: "E-mail address", fallback: ""},
    "phone_ext": {label: "Phone Ext.", fallback: ""},
    "phone_mobile": {label: "Mobile", fallback: ""},
    "birthday": {label: "Birthday", fallback: ""},
    //"profile_pic": {label: "Profile Picture", fallback: ""},
    "created_date": {label: "Created", fallback: "Unknown"},
    "last_update_date": {label: "Last update", fallback: "Unknown"}
}

export function ProfileElement({ field }) {
    const { profile } = useAuthContext();

    // Ignore unknown fields
    if (!fieldLabels[field]) return null;

    const value = profile?.[field];
    const displayValue =
        value != null && value !== ""
            ? value
            : <span className="text-gray-600 italic">{fieldLabels[field].fallback}</span>;

    return (
        <div className="sm:flex sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0 lg:w-48">
                {fieldLabels[field].label}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                <p>
                    {
                        (field === "created_date" || field === "last_update_date")
                            ? formatDate(displayValue, 'en-US', 'dt_elegant') : displayValue
                    }
                </p>
            </dd>
        </div>
    );
}

export default function ProfileDrawer({open, setOpen}) {
    const {user, profile, logout} = useAuthContext()

    return (
        <div>
            <Dialog open={open} onClose={setOpen} className="relative z-50">
            <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <DialogPanel
                                transition
                                className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                            >
                                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                                    <div className="px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <DialogTitle className="text-base font-semibold text-gray-900">Profile</DialogTitle>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus-visible:ring-2 focus-visible:ring-indigo-500"
                                                >
                                                    <span className="absolute -inset-2.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Main */}
                                    <div className="divide-y divide-gray-200">
                                        <div className="pb-6">
                                            <div className="h-24 bg-indigo-700 sm:h-20 lg:h-28" />
                                            <div className="-mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-16">
                                                <div>
                                                    <div className="-m-1 flex">
                                                        <div className="inline-flex overflow-hidden rounded-lg border-4 border-white">
                                                            {profile.profile_pic
                                                                ? <img
                                                                    alt="Profile picture"
                                                                    src={profile.profile_pic}
                                                                    className="size-24 shrink-0 sm:size-40 lg:size-48"
                                                                />
                                                                : <div className="size-24 shrink-0 sm:size-40 lg:size-48 bg-slate-500 text-slate-100 text-8xl pt-12 text-center tracking-wide">
                                                                    {getInitials(`${profile.name || ''} ${profile.surname || ''}`)}
                                                                </div>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-6 sm:ml-6 sm:flex-1">
                                                <div>
                                                        <div className="flex items-center">
                                                            <h3 className="flex gap-2.5 items-center text-xl font-bold text-gray-900 sm:text-2xl">
                                                                {profile.name} {profile.surname}
                                                                <span className="size-5 text-slate-700">
                                                                    {user.role === "admin"? <CheckBadgeIcon/> : <Fragment/> }
                                                                </span>
                                                            </h3>
                                                            {/*<span className="ml-2.5 inline-block size-2 shrink-0 rounded-full bg-green-400">*/}
                                                            {/*    <span className="sr-only">Online</span>*/}
                                                            {/*</span>*/}
                                                        </div>
                                                        <p className="text-sm text-gray-500">@{user.username}</p>
                                                    </div>
                                                    <div
                                                        className="mt-5 flex flex-wrap space-y-3 sm:space-x-3 sm:space-y-0">
                                                        {/*TODO: Implement edit screen and Admin panel*/}
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                            onClick={() => console.log('Edit clicked.')}
                                                        >
                                                            Edit
                                                        </button>

                                                        {
                                                            user.role === "admin"
                                                                ? <button
                                                                    type="button"
                                                                    className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                    onClick={() => console.log('Admin panel clicked.')}
                                                                >
                                                                    Admin panel
                                                                </button>
                                                                : <Fragment/>
                                                        }

                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full shrink-0 items-center justify-center rounded-md bg-chestnut-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-chestnut-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chestnut-600 sm:flex-1"
                                                            onClick={logout}
                                                        >
                                                            Log out
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-4 py-5 sm:px-0 sm:py-0">
                                            <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">

                                                {Object.keys(fieldLabels).map((key) => (
                                                    <ProfileElement key={key} field={key}/>
                                                ))}

                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
