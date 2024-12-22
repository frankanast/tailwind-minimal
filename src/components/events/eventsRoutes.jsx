import EventsPage from "./EventsPage.jsx";

export const eventsRoutes = [
    {
        path: '/events',
        element: <EventsPage />,
        handle: { breadcrumb: 'Events' },
    },
]