import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon } from '@heroicons/react/24/outline'
import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid/index.js";

const solutions = [
    {
        name: 'Analytics',
        description: 'Get a better understanding of where your traffic is coming from',
        href: '#',
        icon: ChartPieIcon,
    },
    {
        name: 'Engagement',
        description: 'Speak directly to your customers with our engagement tool',
        href: '#',
        icon: CursorArrowRaysIcon,
    },
    { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
    {
        name: 'Integrations',
        description: "Connect with third-party tools that you're already using",
        href: '#',
        icon: SquaresPlusIcon,
    },
]

export default function TopbarDrawer({ barContent, drawerContent, callsToAction, expandable= false }) {
    return (
        <Popover className="relative isolate z-50 shadow">
            <div className="bg-white py-5">
                <div className="flex mx-auto max-w-7xl gap-3 px-6 lg:px-8 align-middle">
                    <>
                        {/* Bar content is expected to be an empty element (<></>) */}
                        {barContent}
                    </>

                    <PopoverButton
                        className="rounded-full bg-yellow-600 p-1 text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                    >
                        <ChevronDoubleDownIcon aria-hidden="true" className="h-5 w-5"/>
                    </PopoverButton>
                </div>
            </div>

            <PopoverPanel
                transition
                className="absolute inset-x-0 top-0 -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
                {/* Drawer's content */}
                <div className="mx-auto max-w-7xl px-6 py-6 sm:py-10 lg:px-8">
                    {drawerContent}
                </div>

                <div className="bg-gray-50">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 divide-y divide-gray-900/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-x sm:border-gray-900/5">
                            {callsToAction.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-x-2.5 p-3 px-6 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 sm:justify-center sm:px-0"
                                >
                                    <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    )
}
