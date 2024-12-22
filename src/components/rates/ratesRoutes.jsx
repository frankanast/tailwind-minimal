import RatesList from "./RatesList.jsx";
import RateMappingPage from "./RateMappingPage.jsx";

export const ratesRoutes = [
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
]