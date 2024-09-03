import 'react'

import MessageInput from "./primitives/MessageInput.jsx";
import NoMessagesState from "./primitives/NoMessagesState.jsx";
import ChatView from "./primitives/ChatView.jsx";

import messages from "./mockups/chat.js";

export default function Messages() {
    return (
        <div className="chat-background flex flex-col h-screen justify-between">
            <main className="mb-auto flex-grow flex max-h-full items-center justify-center overflow-auto">
                <div className="mt-auto px-6 lg:w-2/3 sm:w-full items-center justify-center">
                    <div className="w-full">
                        {(Object.keys(messages).length === 0) ? <NoMessagesState/> : <ChatView data={messages} currentUser="programmer93" />}
                    </div>
                </div>
            </main>

            <footer className="flex h-16 bg-white p-6 border-solid border-t border-indigo-100 justify-center sticky bottom-0">
                <span className="flex lg:w-2/3 sm:w-full items-center justify-center">
                    <MessageInput/>
                </span>
            </footer>
        </div>
    )
}
