import "react"
import Avatar from "./Avatar"
import formatDate from "../../utils/formatDate.js";

function formatMessageContent(message) {
    if (!message || !message.message) return "";  // Ensure we are accessing the correct nested structure

    switch (message.message.type) {
        case "text":
            return message.message.content;
        case "img":
            return `${message.sender.username} has sent a picture on ${message.message.datetime_sent}.`;
        case "audio":
            return `${message.sender.username} has sent an audio message on ${message.message.datetime_sent}.`;
        default:
            return `${message.sender.username} has sent an attachment on ${message.message.datetime_sent}.`;
    }
}

// Quote Component
function Quote({ quotedMessage }) {
    if (!quotedMessage) return null;

    const messageContent = formatMessageContent(quotedMessage);

    return (
        <div className="quoted-message bg-gray-200 p-2 rounded text-sm">
            <div className="quoted-message-sender" style={{ color: quotedMessage.sender.hexColor || "black" }}>
                {quotedMessage.sender.username}
            </div>
            <div>{messageContent}</div>
        </div>
    );
}

// SystemBubble Component
function SystemBubble({ message }) {
    return (
        <div className="chat-message system flex flex-col gap-4">
            {message.content}
        </div>
    );
}

// ChatBubbleText Component
function ChatBubbleText({ message, quotedMessage, isOutgoing }) {
    if (!message || !message.sender) return null;
    const messageDirection = `chat-message ${isOutgoing ? 'outgoing' : 'incoming'} flex flex-col gap-4`;
    const rowClassNames = `flex flex-row ${isOutgoing ? "flex-row-reverse" : ""} items-end gap-2`

    return (
        <div className={rowClassNames} key={message.id}>
            <Avatar senderData={message.sender}/>
            <div className={messageDirection}>
                {quotedMessage && <Quote quotedMessage={quotedMessage} />}
                <div className="p-2">
                    <div className="message-sender font-bold">{message.sender.username}</div>
                    <div className="message-content">{message.message.content}</div>
                    <div className="message-timestamp mt-4 text-xs text-right italic text-gray-500">{formatDate(message.message.datetime_sent, "en-US", "t_short")}</div>
                </div>
            </div>
        </div>
    );
}

// ChatBubble Component
export default function ChatBubble({ message, quotedMessage, currentUserId }) {
    // Ensure message and sender are defined
    if (!message || !message.sender) {
        console.error("Invalid message or message sender", message);
        return null; // Return null to prevent errors if message is invalid
    }

    // Determine message direction (outgoing/incoming)
    const isOutgoing = message.sender.id === currentUserId

    if (message.sender.id === '99999999') {
        return <SystemBubble message={message.message} />;
    }

    if (message.message.type === "text") {
        return (
            <ChatBubbleText
                message={message}
                quotedMessage={quotedMessage}
                isOutgoing={isOutgoing}
            />
        );
    }

    // Invalid message type
    return <></>;
}
