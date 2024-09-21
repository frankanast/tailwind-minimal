import 'react';

import MessageInput from "./MessageInput.jsx";
import NoMessagesState from "./NoMessagesState.jsx";
import ChatView from "./ChatView.jsx";
import ChatDivider from "./ChatDivider.jsx";

import messages from "../../assets/mockups/chat.js";


export default function Messages() {

    return (
        <div className="chat-background flex flex-col h-full justify-between">
            <main className="flex-grow flex flex-col max-h-full w-full items-center justify-start overflow-auto">
                <div className="w-full px-4 lg:w-2/3 lg:px-0 items-center justify-center">
                    <ChatDivider date="Today" />
                    <div className="w-full">
                        {(Object.keys(messages).length === 0)
                            ? <NoMessagesState />
                            : <ChatView data={messages} currentUserId="0957392" />}
                    </div>
                </div>
            </main>

            <footer className="flex sticky z-50 bottom-0 items-center justify-center py-2 bg-white w-full">
                <div className="lg:w-2/3 sm:w-full">
                    <MessageInput />
                </div>
            </footer>
        </div>
    );
}