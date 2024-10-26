import Iframe from 'react-iframe'
import {useQuoteContext} from "./QuoteContext.jsx";
import {useRatePresenterContext} from "./RatePresenterContext.jsx";

export default function QuoteRenderer({ props }) {
    // if webpage has no background, without bg-white it'll look transparent.
    // props.url overrides the default load url
    const iframeStyle = "w-10/12 h-full flex flex-col mx-auto mb-0 shadow-lg bg-white"
    // const loadedData = useQuoteContext()
    const {parsedData} = useRatePresenterContext()

    return (
        <Iframe
            url={props?.url || `https://programmino-be.onrender.com/test-html?userinput="${JSON.stringify(parsedData || {data: "no data"})}"`}
            id="renderer-iframe"
            className={iframeStyle}
            overflow="auto"
            display="block"
            position="relative"
        />
    );
};
