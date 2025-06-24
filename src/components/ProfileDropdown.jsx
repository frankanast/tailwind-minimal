import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ArrowRightStartOnRectangleIcon,
    UserIcon,
    ClockIcon
} from '@heroicons/react/20/solid'

import {CheckBadgeIcon} from '@heroicons/react/16/solid'
import {useAuthContext} from "../context/AuthContext.jsx";
import {useState} from "react";
import ProfileDrawer from "./ProfileDrawer.jsx";
import getInitials from "../utils/getInitials.js";


export default function ProfileDropdown() {
    const { logout, user, profile } = useAuthContext()
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    className='flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50'
                    onClick={() => setOpen(!open)}
                >

                    {profile.profile_pic
                        ? <img
                            alt='Profile pic not found'
                            src={profile.profile_pic}
                            className='size-8 rounded-full bg-gray-50'
                        />

                        : <div className='size-8 rounded-full bg-slate-500 text-slate-50 items-center pt-1'>
                            {getInitials(`${profile.name} ${profile.surname}`)}
                        </div>
                    }
                    <span className="flex gap-1">
                        <span className='sr-only'>Your profile</span>
                        <span aria-hidden='true'>{profile.name} {profile.surname}</span>
                        <CheckBadgeIcon className="size-4 text-slate-500 hover:bg-slate-40 mt-1"/>
                    </span>

                </button>
            </div>

            <ProfileDrawer open={open} setOpen={setOpen} />
        </div>
    )
}
