import 'react'
import {MenuItem} from "@headlessui/react";

export function ActionButton({ id, text, icon, className, href, onClick }) {
    return (
        <MenuItem>
            {/*TODO: we are handling */}
            <a
                key={id}
                name={name}
                href={href  || "#"}
                className={className ? className :"group flex items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"}
            >
                <span aria-hidden="true" className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500">
                    {icon}
                </span>
                {text}
            </a>
        </MenuItem>
    );
}
