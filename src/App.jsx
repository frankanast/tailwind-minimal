import 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoginView from "./components/LoginView.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import QuotePage from "./components/quotes/QuotePage.jsx";
import SettingsPage from "./components/settings/SettingsPage.jsx";
import EventsPage from "./components/events/EventsPage.jsx";
import MessagesPage from "./components/messages/MessagesPage.jsx";
import SupportPage from "./components/help/SupportPage.jsx";
import RoomsList from "./components/rooms/RoomsList.jsx";
import RatesList from "./components/rates/RatesList.jsx";
import RoomMappingPage from "./components/rooms/RoomMappingPage.jsx";
import RateMappingPage from "./components/rates/RateMappingPage.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import { RoomMappingFormProvider } from "./context/RoomMappingFormContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { RateMappingFormProvider } from "./context/RateMappingFormContext.jsx";
import { QuoteProvider } from "./context/QuoteContext.jsx";
import { FileUploadProvider } from "./context/FileUploadContext.jsx";
import TemplateEditor from "./components/templates/TemplateEditor.jsx";
import TemplatesList from "./components/templates/TemplatesList.jsx";
import {TemplateProvider} from "./context/TemplatesContext.jsx";

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
                element: <RoomsList />,
                handle: { breadcrumb: 'Rooms' },
            },
            {
                path: '/rates',
                element: <RatesList />,
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
                element: <TemplatesList />,
                handle: { breadcrumb: 'Templates' },
            },
            {
                path: '/templates/:templateId',
                element: <TemplateEditor />,
                handle: { breadcrumb: 'Template Editor' },
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
                            <TemplateProvider>
                                <FileUploadProvider>
                                    <RouterProvider router={mainRouter} />
                                </FileUploadProvider>
                            </TemplateProvider>
                        </RateMappingFormProvider>
                    </RoomMappingFormProvider>
                </QuoteProvider>
            </SettingsProvider>
        </QueryClientProvider>
    );
}

export default App;
