import 'react';

export default function ChatView({ data = [], currentUser }) {
    if (!currentUser) return null;  // Return nothing or a loading state if currentUser is not available

    return (
        <div className="chat-container">
            {data.map((item) => {
                let className = 'chat-message flex flex-col gap-10';

                if (item.sender.username.trim() === '_SYSTEM') {
                    className += ' system';
                } else {
                    const isOutgoing = item.sender.username.trim().toLowerCase() === currentUser.trim().toLowerCase();
                    className += isOutgoing ? ' outgoing' : ' incoming';
                }

                return (
                    <div
                        className={className}
                        key={item.id}
                    >
                        {item.message.content}
                    </div>
                );
            })}
        </div>
    );
}
