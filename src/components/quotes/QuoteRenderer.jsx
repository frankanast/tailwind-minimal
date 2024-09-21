import {React} from 'react';
import Iframe from 'react-iframe'

export default function QuoteRenderer({ props }) {
    return (
        <Iframe
            url={props?.url || ""}
            // width="100%"
            // height="100%"
            id=""
            className="w-10/12 h-full flex flex-col mx-auto mb-0 shadow-lg"
            overflow="auto"
            display="block"
            position="relative"
            styles={{backgroundColor: "white"}}
        />
    );
};
