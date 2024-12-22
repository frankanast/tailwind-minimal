import QuotePage from "./QuotePage.jsx";

export const quoteRoutes = [
    {
        path: '/quote',
        element: <QuotePage />,
        handle: { breadcrumb: 'Quote' },
    },
]