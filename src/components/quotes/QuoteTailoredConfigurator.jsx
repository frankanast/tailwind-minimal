import {
    UserGroupIcon,
    RectangleGroupIcon,
    PlusIcon,
} from '@heroicons/react/20/solid'
import {Fragment} from "react";
import classNames from "../../utils/classNames.js";
import occupancyLiteral from "../../utils/occupancyLiteral.js";
import AddSolutionBox from "./AddSolutionBox.jsx";

const solutions = {
    name: 'Interconnecting Rooms',
    badge: <div className="rounded-md size-12 bg-gray-500 text-gray-300 text-xl text-center font-medium pt-2 select-none mt-1">PD</div>,
    rooms: [],
}

function RoomCategoryBadge() {
    return (
        <div
            className="rounded-md size-12 bg-gray-500 text-gray-300 text-xl text-center font-medium pt-2 select-none mt-1">
            PD
        </div>
    )
}

function TailoredSolutionCard() {
    return (
        <div className="rounded-lg bg-white border border-gray-200 shadow-md">
            <div className="bg-white p-6">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex sm:space-x-5">
                        <div>
                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">{solutions.name}</p>
                            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                                {/*STATS SECTION */}
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <UserGroupIcon className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"/>
                                    4 adults
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <UserGroupIcon className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"/>
                                    1 child
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <RectangleGroupIcon className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"/>
                                    2 rooms
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center sm:mt-0">
                        <div
                            className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Add
                        </div>
                    </div>
                </div>
                {/*ROOMS SECTION*/}
                <div className="flex gap-4 mt-7">
                    {solutions.badge ? solutions.badge : <Fragment/>}
                    <div className="flex flex-col">
                        <div className="font-medium">Premium Deluxe</div>
                        <div className="flex gap-3">
                            <div className="border border-px border-gray-400 text-gray-700 rounded-md px-2">2 adults
                            </div>
                            <div className="border border-px border-gray-400 text-gray-700 rounded-md px-2">Il Grigio,
                                Travel Without Worries
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mt-7">
                    <div
                        className="rounded-md size-12 bg-yellow-500 text-yellow-800 text-xl text-center font-medium pt-2 select-none mt-1">ST
                    </div>
                    <div className="flex flex-col">
                        <div className="font-medium">Suite</div>
                        <div className="flex gap-3">
                            <div className="border border-px border-gray-400 text-gray-700 rounded-md px-2">2 adults, 1
                                child
                            </div>
                            <div className="border border-px border-gray-400 text-gray-700 rounded-md px-2">Il Grigio,
                                Travel Without Worries
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function QuoteTailoredConfigurator() {
    return (
        <div className="flex flex-col px-3 gap-7 overflow-auto">
            {/*<div>*/}
            {/*    <nav className="flex space-x-4 justify-end">*/}
            {/*        <button className='bg-indigo-700 text-white rounded-md px-3 py-2 text-sm font-medium'>*/}
            {/*            Add solution*/}
            {/*        </button>*/}
            {/*    </nav>*/}
            {/*</div>*/}
            <TailoredSolutionCard/>
            <AddSolutionBox />
        </div>
    )
}
