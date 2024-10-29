import Iframe from 'react-iframe';
import { useRatePresenterContext } from './RatePresenterContext.jsx';
import {useEffect, useState} from "react";

export default function QuoteRenderer() {
    // if webpage has no background, without bg-white it'll look transparent.
    const iframeStyle = 'w-10/12 h-full flex flex-col mx-auto mb-0 shadow-lg bg-white';
    const { parsedData } = useRatePresenterContext();

    const [iframeUrl, setIframeUrl] = useState("www.example.com");

    useEffect(() => {
        if (parsedData) {
            const sendParsedData = async () => {
                try {
                    const response = await fetch('https://www.programmino-be.onrender.com/generate-html', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ content: parsedData })
                    });

                    if (!response.ok) {
                        throw new Error('Failed to send parsedData');
                    }

                    const data = await response.json();
                    const tokenName = data["token-name"];

                    setIframeUrl(`/token/${tokenName}`);
                } catch (error) {
                    console.error("Error sending parsedData:", error);
                }
            };

            sendParsedData();
        }
    }, [parsedData]);

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
