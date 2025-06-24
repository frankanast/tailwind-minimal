import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ArrowRightStartOnRectangleIcon,
    UserIcon,
    ClockIcon
} from '@heroicons/react/20/solid'
import {useAuthContext} from "../context/AuthContext.jsx";


export default function ProfileDropdown() {
    const { logout } = useAuthContext()

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton
                    href='#'
                    className='flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50'
                >
                    <img
                        alt=''
                        src='https://avatars.githubusercontent.com/u/82828758?v=4'
                        className='size-8 rounded-full bg-gray-50'
                    />
                    <span className='sr-only'>Your profile</span>
                    <span aria-hidden='true'>Francesco Anastasio</span>
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-50 mt-2 w-56 mx-6 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                anchor={{ to: 'top start', gap: '10px' }}
            >
                <div className="py-1">
                    <MenuItem>
                        <a
                            href="#"
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        >
                            <ClockIcon
                                aria-hidden="true"
                                className="mr-3 size-5 text-gray-400 group-data-[focus]:text-gray-500"
                            />
                            Activity log
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a
                            href="#"
                            className="group flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        >
                        <UserIcon
                                aria-hidden="true"
                                className="mr-3 size-5 text-gray-400 group-data-[focus]:text-gray-500"
                            />
                            View profile
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <button
                            className="group flex w-full items-center px-4 py-2 text-chestnut-700 text-sm data-[focus]:bg-chestnut-100 data-[focus]:text-chestnut-900 data-[focus]:outline-none"
                            onClick={logout}
                        >
                            <ArrowRightStartOnRectangleIcon
                                aria-hidden="true"
                                className="mr-3 size-5 group-data-[focus]:text-chestnut-500 text-chestnut-700"
                            />
                            Log out
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}
