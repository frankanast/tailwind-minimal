import 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoginView from "./components/LoginView.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import QuotePage from "./components/quotes/QuotePage.jsx";
import SettingsPage from "./components/settings/SettingsPage.jsx";
import EventsPage from "./components/events/EventsPage.jsx";
import MessagesPage from "./components/messages/MessagesPage.jsx";
import Templates from "./components/templates/TemplatesPageLegacy.jsx";
import SupportPage from "./components/help/SupportPage.jsx";
import MappingRoomsList from "./components/rooms/MappingRoomsList.jsx";
import MappingRatesList from "./components/rates/MappingRatesList.jsx";
import RoomMappingPage from "./components/rooms/RoomMappingPage.jsx";
import RateMappingPage from "./components/rates/RateMappingPage.jsx";
import PageNotFound from "./components/PageNotFound.jsx";

import { RoomMappingFormProvider } from "./context/RoomMappingFormContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { RateMappingFormProvider } from "./context/RateMappingFormContext.jsx";
import { QuoteProvider } from "./context/QuoteContext.jsx";
import { FileUploadProvider } from "./context/FileUploadContext.jsx";

const mainRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomeScreen />,
        handle: { breadcrumb: 'Home' },
        errorElement: <PageNotFound />,
        children: [
            {
                path: '/',
                element: <QuotePage />,
                handle: { breadcrumb: 'Quote' },
            },
            {
                path: '/quote',
                element: <QuotePage />,
                handle: { breadcrumb: 'Quote' },
            },
            {
                path: '/events',
                element: <EventsPage />,
                handle: { breadcrumb: 'Events' },
            },
            {
                path: '/messages',
                element: <MessagesPage />,
                handle: { breadcrumb: 'Messages' },
            },
            {
                path: '/rooms',
                element: <MappingRoomsList />,
                handle: { breadcrumb: 'Rooms' },
            },
            {
                path: '/rates',
                element: <MappingRatesList />,
                handle: { breadcrumb: 'Rates' },
            },
            {
                path: '/rates/:rateId',
                element: <RateMappingPage />,
                handle: { breadcrumb: 'Rate mapping' },
            },
            {
                path: '/rooms/:roomId',
                element: <RoomMappingPage />,
                handle: { breadcrumb: 'Room mapping' },
            },
            {
                path: '/templates',
                element: <Templates />,
                handle: { breadcrumb: 'Templates' },
            },
            {
                path: '/settings',
                element: <SettingsPage />,
                handle: { breadcrumb: 'Settings' },
                errorElement: <PageNotFound />
            },
            {
                path: '/support',
                element: <SupportPage />,
                handle: { breadcrumb: 'Support' },
                children: [
                    {
                        path: 'status',
                        element: <div>Status...</div>,
                        handle: { breadcrumb: 'Service status' },
                    },
                ]
            },
        ]
    },
]);

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SettingsProvider>
                <QuoteProvider>
                    <RoomMappingFormProvider>
                        <RateMappingFormProvider>
                            <FileUploadProvider>
                                <RouterProvider router={mainRouter} />
                            </FileUploadProvider>
                        </RateMappingFormProvider>
                    </RoomMappingFormProvider>
                </QuoteProvider>
            </SettingsProvider>
        </QueryClientProvider>
    );
}

export default App;
