'use client'
import 'react'
import {SettingsProvider} from "../../context/SettingsContext.jsx";
import MappingRoomsList from "./MappingRoomsList.jsx";
import MappingRatesList from "./MappingRatesList.jsx";
import MappingDialog from "./MappingDialog.jsx";
import {RoomMappingFormProvider} from "../../context/RoomMappingFormContext.jsx";
import {FileUploadProvider} from "../../context/FileUploadContext.jsx";
import {RateMappingFormProvider} from "../../context/RateMappingFormContext.jsx";

export default function SettingsPage() {


    return (
        <SettingsProvider>
                <RoomMappingFormProvider>
                    <RateMappingFormProvider>
                        <FileUploadProvider>
                            <div className="flex flex-col h-screen">
                                <main>
                                    <div className="mx-auto max-w-7xl pt-4 lg:flex lg:gap-x-16 lg:px-8">
                                        <div className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
                                            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                                                <div>
                                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Rooms</h2>
                                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                                        This information will be displayed both within the UI and in letters.
                                                    </p>
                                                    <div className="flex flex-col h-1/3 overflow-auto">
                                                        <MappingRoomsList/>
                                                        <MappingDialog strategy="room"/>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="mt-6 text-base font-semibold leading-7 text-gray-900">Rates</h2>
                                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                                        This information will be displayed both within the UI and in letters.
                                                    </p>
                                                    <div className="flex flex-col h-1/3 overflow-auto">
                                                        <MappingRatesList />
                                                        <MappingDialog strategy="rate"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </FileUploadProvider>
                    </RateMappingFormProvider>
                </RoomMappingFormProvider>
            </SettingsProvider>
    )
}
