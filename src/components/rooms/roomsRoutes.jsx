import RoomsList from "./RoomsList.jsx";
import RoomMappingPage from "./RoomMappingPage.jsx";

export const roomsRoutes = [
    {
        path: '/rooms',
        element: <RoomsList />,
        handle: { breadcrumb: 'Rooms' },
    },
    {
        path: '/rooms/:roomId',
        element: <RoomMappingPage />,
        handle: { breadcrumb: 'Room mapping' },
    },
]