import Iframe from 'react-iframe';
import {useEffect, useRef, useState} from "react";
import {useQuotePreviewContext} from "./QuotePreviewContext.jsx";

export default function QuoteRenderer() {
    const {
        previewUrl,
    } = useQuotePreviewContext();

    const [iframeUrl, setIframeUrl] = useState('');

    useEffect(() => {
        setIframeUrl(previewUrl);

    }, [previewUrl])

    return (
        <Iframe
            // if webpage has no background, without bg-white it'll look weirdly transparent. Padding simulates a page's margins.
            // margin top set on parent component (padding top), to avoid weird overflow.
            url={iframeUrl}
            id="renderer-iframe"
            className='h-full w-9/12 flex flex-col mx-auto mb-0 px-10 pt-10 shadow-lg bg-white'
            overflow="auto"
            display="block"
            position="relative"
        />
    );
};
