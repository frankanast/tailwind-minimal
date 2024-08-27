import 'react'
import {Menu, MenuButton} from "@headlessui/react";

export default function ProfileSettingsDropdown({ variant, data }) {
    if (variant === "desktop") {
        return(
            <>
                <Menu as="div" className="relative">
                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                        <img
                            className="h-8 w-8 rounded-full"
                            alt={`${data.firstName} ${data.lastName}'s profile picture`}
                            src={data.profilePicUrl}
                        />
                        <span className="hidden lg:flex lg:items-center">
                          <span aria-hidden="true" className="ml-4 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
                            {`${data.firstName} ${data.lastName}`}
                          </span>
                        </span>
                    </MenuButton>
                </Menu>
            </>
        );

    } else {
        return(
            <>
                <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
                >
                    <img
                        className="h-8 w-8 rounded-full bg-gray-50"
                        alt={`${data.firstName} ${data.lastName}'s profile picture`}
                        src={data.profilePicUrl}
                    />
                    <span aria-hidden="true">{`${data.firstName} ${data.lastName}`}</span>
                </a>
            </>
        );
    }
}
