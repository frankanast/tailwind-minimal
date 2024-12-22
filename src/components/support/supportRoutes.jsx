import SupportPage from "./SupportPage.jsx";

export const supportRoutes = [
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