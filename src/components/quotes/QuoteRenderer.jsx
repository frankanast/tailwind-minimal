import Iframe from 'react-iframe'
import {useQuoteContext} from "./QuoteContext.jsx";

export default function QuoteRenderer({ props }) {
    const { checkInDate, checkOutDate, occupancy } = useQuoteContext()

    return (
        <Iframe
            url={props?.url || "https://programmino-be.onrender.com/test-html?userinput=" + checkInDate.toString() + checkOutDate.toString() + JSON.stringify(occupancy)}
            id=""
            className="w-10/12 h-full flex flex-col mx-auto mb-0 shadow-lg"
            overflow="auto"
            display="block"
            position="relative"
            styles={{backgroundColor: "white"}}
        />
    );
};
