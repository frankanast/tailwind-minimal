import Iframe from 'react-iframe'

export default function QuoteRenderer({ props }) {
    // if webpage has no background, without bg-white it'll look transparent.
    const iframeStyle = "w-10/12 h-full flex flex-col mx-auto mb-0 shadow-lg bg-white"

    return (
        <Iframe
            url={props?.url || ""}
            id="renderer-iframe"
            className={iframeStyle}
            overflow="auto"
            display="block"
            position="relative"
        />
    );
};
