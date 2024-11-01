import Iframe from 'react-iframe';
import { useRatePresenterContext } from './RatePresenterContext.jsx';
import {useEffect, useState} from "react";

export default function QuoteRenderer() {
    const { parsedData, editedEntities } = useRatePresenterContext();
    const [iframeUrl, setIframeUrl] = useState('');

    useEffect(() => {
        if (parsedData.data) {
            const sendParsedData = async () => {
                try {
                    const response = await fetch('https://programmino-be.onrender.com/preview_template/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ content: { data: parsedData } }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to send parsedData');
                    }

                    const data = await response.json();
                    const tokenName = data["token"];

                    // setIframeUrl(`https://programmino-be.onrender.com/test-html?userinput=${encodeURIComponent(tokenName) || "Unable to fetch the token."}`);
                    setIframeUrl(`https://programmino-be.onrender.com/token/${encodeURIComponent(tokenName)}`);

                } catch (error) {
                    console.error("Error sending parsedData:", error);
                }
            };
            sendParsedData()
        }
    }, [parsedData, editedEntities]);

    return (
        <Iframe
            url={iframeUrl}
            id="renderer-iframe"
            // if webpage has no background, without bg-white it'll look weirdly transparent. Padding simulates a page's margins.
            // margin top set on parent component (padding top), to avoid weird overflow.
            className='h-full w-9/12 flex flex-col mx-auto mb-0 px-10 pt-10 shadow-lg bg-white'
            overflow="auto"
            display="block"
            position="relative"
        />
    );
};
