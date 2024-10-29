import Iframe from 'react-iframe';
import { useRatePresenterContext } from './RatePresenterContext.jsx';
import { useQuery } from "@tanstack/react-query";

export default function QuoteRenderer() {
    // If webpage has no background, without bg-white it'll look transparent.
    const iframeStyle = 'w-10/12 h-full flex flex-col mx-auto mb-0 shadow-lg bg-white';

    const { parsedData } = useRatePresenterContext();

    const { data: tokenData, isError, isFetching } = useQuery({
        queryKey: ["postData", parsedData],
        queryFn: async () => {
            const url = `https://programmino-be.onrender.com/render-email/`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedData),
            });

            if (response.ok) {
                console.log(JSON.stringify(response));
            }

            if (!response.ok) {
                throw new Error("Unable to post data due to network issues.");
            }

            return await response.json();
        },
        enabled: !!parsedData, // Only run if parsedData is available
    });

    if (isFetching) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading data...</div>;
    }

    return (
        <Iframe
            url={tokenData?.content_url|| ''}
            id="renderer-iframe"
            className={iframeStyle}
            overflow="auto"
            display="block"
            position="relative"
        />
    );
};
