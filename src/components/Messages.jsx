import 'react';

import MessageInput from "./primitives/MessageInput.jsx";
import NoMessagesState from "./primitives/NoMessagesState.jsx";
import ChatView from "./primitives/ChatView.jsx";

import messages from "./mockups/chat.js";
import ChatDivider from "./primitives/ChatDivider.jsx";

export default function Messages() {

    return (
        <div className="chat-background flex flex-col h-screen justify-between">
            <main className="flex-grow flex flex-col max-h-full w-full items-center justify-start overflow-auto">
                <div className="lg:w-2/3 sm:w-full items-center justify-center">
                    <ChatDivider date="Today" />
                    <div className="w-full">
                        {(Object.keys(messages).length === 0)
                            ? <NoMessagesState />
                            : <ChatView data={messages} currentUserId="0957392" />}
                    </div>
                </div>
            </main>

            <footer className="flex items-center justify-center py-2 bg-white w-full">
                <div className="lg:w-2/3 sm:w-full">
                    <MessageInput />
                </div>
            </footer>
        </div>
    );
}
