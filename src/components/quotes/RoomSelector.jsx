import {EllipsisVerticalIcon, PlusIcon, UsersIcon, XCircleIcon} from '@heroicons/react/20/solid'
import ChildIcon from '../../assets/child.svg?react'
import {nanoid} from "nanoid";

function RoomsList() {
    const rooms = [
        {key: nanoid(), adults: 2, children: 1, literal : "2 adults, 1 child"},
        {key: nanoid(), adults: 2, children: 1, literal : "2 adults, 1 child"},
    ]

    return (
        <div className="flex flex-col max-h-64 overflow-y-auto">
            {rooms.map((room) => (
                <div
                    key={room.key}
                    className="px-3 py-3 hover:bg-gray-100 text-md h-12"
                >
                    <div className="flex justify-between align-baseline *:hover:text-gray-500">
                        {room.literal}
                        <XCircleIcon className=" h-5 w-5 text-transparent cursor-pointer" />
                    </div>

                </div>
            ))}
        </div>
    )
}

function RoomsInput() {
    return (
        <div>
            <div className="mt-2 flex rounded-md shadow-sm bottom-0">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <UsersIcon aria-hidden="true" className="h-5 w-5 text-gray-400"/>
                    </div>
                    <input
                        id="adults"
                        name="adults"
                        type="number"
                        placeholder="Adt."
                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <ChildIcon aria-hidden="true" className="h-5 w-5"/>
                    </div>
                    <input
                        id="children"
                        name="children"
                        type="number"
                        placeholder="Ch."
                        className="block w-full rounded-none border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <button
                    type="button"
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 bg-indigo-600"
                >
                    <PlusIcon aria-hidden="true" className="-ml-0.5 h-5 w-5 text-gray-200"/>
                    Add
                </button>
            </div>
        </div>
    )
}

export default function RoomSelector() {
    return (
        <div className="flex flex-col h-full justify-between">
            <RoomsList/>
            <RoomsInput/>
        </div>
    )
}
