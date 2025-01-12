import 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LoginView from "./components/LoginView.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import QuotePage from "./components/quotes/QuotePage.jsx";
//import MessagesPage from "./components/messages/MessagesPage.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import { RoomMappingFormProvider } from "./context/RoomMappingFormContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { RateMappingFormProvider } from "./context/RateMappingFormContext.jsx";
import { QuoteProvider } from "./context/QuoteContext.jsx";
import { FileUploadProvider } from "./context/FileUploadContext.jsx";
import { TemplateProvider } from "./context/TemplatesContext.jsx";
import {templateRoutes} from "./components/templates/templateRoutes.jsx";
import {settingsRoutes} from "./components/settings/settingsRoutes.jsx";
import {supportRoutes} from "./components/support/supportRoutes.jsx";
import {eventsRoutes} from "./components/events/eventsRoutes.jsx";
import {quoteRoutes} from "./components/quotes/quoteRoutes.jsx";
import {roomsRoutes} from "./components/rooms/roomsRoutes.jsx";
import {ratesRoutes} from "./components/rates/ratesRoutes.jsx";

const mainRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomeScreen />,
        handle: { breadcrumb: 'Home' },
        errorElement: <PageNotFound />,
        children: [
            {
                // 'Quote' section shows by default at startup
                path: '/',
                element: <QuotePage />,
                handle: { breadcrumb: 'Quote' },
            },
            ...quoteRoutes,
            ...eventsRoutes,
            ...roomsRoutes,
            ...ratesRoutes,
            ...templateRoutes,
            ...settingsRoutes,
            ...supportRoutes,
            // {
            //     // Ghost path: 'messages' section is not developed yet
            //     path: '/messages',
            //     element: <MessagesPage />,
            //     handle: { breadcrumb: 'Messages' },
            // },
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
                            {/*<TemplateProvider>  --> Called at route, as we use params for business logic */}
                                <FileUploadProvider>
                                    <RouterProvider router={mainRouter} />
                                </FileUploadProvider>
                            {/*</TemplateProvider>*/}
                        </RateMappingFormProvider>
                    </RoomMappingFormProvider>
                </QuoteProvider>
            </SettingsProvider>
        </QueryClientProvider>
    );
}

export default App;
