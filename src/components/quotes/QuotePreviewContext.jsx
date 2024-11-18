import {createContext, useContext, useEffect, useState} from "react";
import {useRatePresenterContext} from "./RatePresenterContext.jsx";
import {copyHTMLToClipboard, copyTextToClipboard} from "../../utils/copyToClipboard.js";

export const QuotePreviewContext = createContext(undefined);

export function QuotePreviewProvider({ children }) {
    const [token, setToken] = useState(null)
    const [htmlContent, setHtmlContent] = useState("")
    const [previewUrl, setPreviewUrl] = useState("")
    const [language, setLanguage] = useState("enUK")
    const [template, setTemplate] = useState("default")

    const { parsedData, editedEntities } = useRatePresenterContext()

    useEffect(() => {
        // Load preview URL
        if (parsedData.data) {
            const sendParsedData = async () => {
                try {
                    const response = await fetch('https://programmino-be.onrender.com/preview_template/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ content: { data: parsedData } }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to send parsedData from QuotePreviewContext');
                    }

                    const data = await response.json();
                    const tokenName = data["token"];
                    setToken(tokenName);

                    setPreviewUrl(`https://programmino-be.onrender.com/token/${encodeURIComponent(tokenName)}`);

                } catch (error) {
                    console.error("Error sending parsedData from QuotePreviewContext:", error);
                }
            };
            sendParsedData()
        }
    }, [parsedData, editedEntities]);

    async function updateContentState() {
        // Load preview content and store in state
        if (token) {
            try {
                const response = await fetch(`https://programmino-be.onrender.com/token/${token}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch HTML content from backend');
                }
                const responseData = await response.text();
                setHtmlContent(responseData);

            } catch (error) {
                console.error("Error updating content state:", error);
            }
        }
    }

    function copyHtmlContent() {
        if (htmlContent) {
            copyHTMLToClipboard({ content: htmlContent })
                .catch((error) => {
                    console.error("Tried to copy HTML content, but an error occurred: ", error)
                });
        } else {
            console.warn("Tried to copy HTML content, but there wasn't any.")
        }
    }

    useEffect(() => {
        // Updates htmlContent and plainTextContent when the token changes.
        if (token) {
            updateContentState();
        }
    }, [token]);

    function copyTextContent() {
        if (htmlContent) {
            copyTextToClipboard({ content: htmlContent })
                .catch((error) => {
                    console.error("Tried to copy plain text content, but an error occurred: ", error)
                });
        } else {
            console.warn("Tried to copy plain text content, but there wasn't any.")
        }
    }

    const openPreviewLink = () => {
        if (token) {
            const link = (`https://programmino-be.onrender.com/token/${token}`)
            window.open(link, "_blank")
        }
    }

    return (
        <QuotePreviewContext.Provider value={{
            language,
            setLanguage,
            template,
            setTemplate,
            previewUrl,
            copyHtmlContent,
            copyTextContent,
            openPreviewLink,
        }}>
            {children}
        </QuotePreviewContext.Provider>
    );
}

export function useQuotePreviewContext() {
    const context = useContext(QuotePreviewContext);
    if (context === undefined) {
        throw new Error('useQuotePreviewContext must be used within a QuotePreviewProvider');
    }
    return context;
}
