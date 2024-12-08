'use client'
import 'react'
import {SettingsProvider} from "../../context/SettingsContext.jsx";
import {RoomMappingFormProvider} from "../../context/RoomMappingFormContext.jsx";
import {FileUploadProvider} from "../../context/FileUploadContext.jsx";
import {RateMappingFormProvider} from "../../context/RateMappingFormContext.jsx";
import SettingsToolbar from "./SettingsToolbar.jsx";

import {Outlet, useLocation} from 'react-router-dom'
import SettingsSections from "./SettingsSections.jsx";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <SettingsSections />,
//         handle: {breadcrumb: "Home"},
//         errorElement: <SettingsNotFoundPage />
//     },
//     {
//         path: "/rooms",
//         element: <MappingRoomsList />,
//         handle: {breadcrumb: "Rooms"}
//     },
//     {
//         path: "/rates",
//         element: <MappingRatesList />,
//         handle: {breadcrumb: "Rates"}
//     },
//     {
//         path: "/rooms/:roomId",
//         element: <RoomMappingForm />,
//         handle: {breadcrumb: ({ params }) => `Room ${params.id}`}
//     },
//     {
//         path: "/rates/:rateId",
//         element: <RateMappingForm />,
//         handle: {breadcrumb: ({ params }) => `Rate ${params.id}`}
//     },
//
// ])

export default function SettingsPage() {
    const location = useLocation()
    const isRoot = location.pathname === "/settings";

    return (
        <SettingsProvider>
                <RoomMappingFormProvider>
                    <RateMappingFormProvider>
                        <FileUploadProvider>
                            <div className="flex flex-col h-screen">
                                <SettingsToolbar/>
                                <div className="mx-auto max-w-7xl px-6 lg:px-8 lg:mx-0 lg:max-w-none">
                                    {isRoot ? (
                                        <SettingsSections />
                                    ) : (
                                        <Outlet />
                                    )}
                                </div>
                            </div>
                        </FileUploadProvider>
                    </RateMappingFormProvider>
                </RoomMappingFormProvider>
        </SettingsProvider>
    )
}
