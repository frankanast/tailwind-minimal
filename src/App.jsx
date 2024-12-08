import 'react'
import LoginView from "./components/LoginView.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import QuotePage from "./components/quotes/QuotePage.jsx";
import SettingsPage from "./components/settings/SettingsPage.jsx";
import EventsPage from "./components/events/EventsPage.jsx";
import MessagesPage from "./components/messages/MessagesPage.jsx";
import Templates from "./components/templates/TemplatesPage.jsx";
import SupportPage from "./components/help/SupportPage.jsx";
import MappingRoomsList from "./components/settings/MappingRoomsList.jsx";
import MappingRatesList from "./components/settings/MappingRatesList.jsx";
import RoomMappingPage from "./components/settings/RoomMappingPage.jsx";
import RateMappingPage from "./components/settings/RateMappingPage.jsx";
import PageNotFound from "./components/PageNotFound.jsx";

const mainRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomeScreen />,
        handle: { breadcrumb: 'Home' },
        errorElement: <PageNotFound />,
        children: [
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
                path: '/templates',
                element: <Templates />,
                handle: { breadcrumb: 'Templates' },
            },
            {
                path: '/settings',
                element: <SettingsPage />,
                handle: { breadcrumb: 'Settings' },
                errorElement: <PageNotFound />,
                children: [
                    {
                        path: 'rooms',
                        element: <MappingRoomsList />,
                        handle: { breadcrumb: 'Rooms' },
                    },
                    {
                        path: 'rates',
                        element: <MappingRatesList />,
                        handle: { breadcrumb: 'Rates' },
                    },
                    {
                        path: 'rooms/:roomId',
                        element: <RoomMappingPage />,
                        handle: { breadcrumb: 'Room mapping' },
                    },
                    {
                        path: 'rates/:rateId',
                        element: <RateMappingPage />,
                        handle: { breadcrumb: 'Rate mapping' },
                    },
                ]
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

    return(
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={mainRouter}>
                <HomeScreen />
            </RouterProvider>
        </QueryClientProvider>
    )
}

export default App;
