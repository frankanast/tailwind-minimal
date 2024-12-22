import SettingsPage from "./SettingsPage.jsx";
import PageNotFound from "../PageNotFound.jsx";

export const settingsRoutes = [
    {
        path: '/settings',
        element: <SettingsPage />,
        handle: { breadcrumb: 'Settings' },
        errorElement: <PageNotFound />
    },
]