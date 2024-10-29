import Iframe from 'react-iframe';
import { useRatePresenterContext } from './RatePresenterContext.jsx';
import { useState, useEffect } from 'react';

export default function QuoteRenderer() {
    // if webpage has no background, without bg-white it'll look transparent.
    const iframeStyle = 'w-10/12 h-full flex flex-col mx-auto mb-0 shadow-lg bg-white';
    const { parsedData } = useRatePresenterContext();
    const [responseToken, setResponseToken] = useState({ content_url: 'https://example.com' });

    useEffect(() => {
        if (!parsedData) {
            setResponseToken({ content_url: 'https://example.com' });
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch('https://programmino-be.onrender.com/render-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(parsedData),
                });

                if (response.ok) {
                    const data = await response.json();
                    setResponseToken(data);
                } else {
                    console.error('Failed to fetch content URL:', response.statusText);
                    setResponseToken({ content_url: 'https://example.com' });
                }
            } catch (error) {
                console.error('Error fetching content URL:', error);
                setResponseToken({ content_url: 'https://example.com' });
            }
        };

        fetchData()
        console.log(responseToken);
    }, [parsedData]);

    return (
        <Iframe
            url={responseToken.content_url}
            id="renderer-iframe"
            className={iframeStyle}
            overflow="auto"
            display="block"
            position="relative"
        />
    );
};
