import "react";
import ChatBubble from "./ChatBubble.jsx";

export default function ChatView({ data = [], currentUserId }) {
    if (!currentUserId) return <div>Loading...</div>; // Show loading state instead of null

    return (
        <div className="w-full">
            {data.map((item) => (
                <div key={item.message.id}>
                    <ChatBubble
                        message={item}
                        quotedMessage={data.find(msg => msg.id === item.message.quotes)}
                        currentUserId={currentUserId}
                    />
                </div>
            ))}
        </div>
    );
}
