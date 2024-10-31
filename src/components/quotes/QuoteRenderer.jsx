import Iframe from 'react-iframe';
import { useRatePresenterContext } from './RatePresenterContext.jsx';
import {useEffect, useState} from "react";

export default function QuoteRenderer() {
    // if webpage has no background, without bg-white it'll look transparent.
    const iframeStyle = 'h-full w-2/3 flex flex-col mx-auto mb-0 shadow-lg bg-white';
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
            className={iframeStyle}
            overflow="auto"
            display="block"
            position="relative"
        />
    );
};
