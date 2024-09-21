import 'react';
import {MenuItems} from "@headlessui/react";
import {ActionButton} from "./ActionButton.jsx";
import {nanoid} from "nanoid";

export default function ActionMenu({ actions: actions = [] }) {
    return (
        <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
            {actions.map((btn) => (
                <ActionButton
                    key={nanoid()}
                    text={btn.text}
                    icon={btn.icon}
                    href={btn.href || '#'}
                />
            ))}
        </MenuItems>
    );
}
