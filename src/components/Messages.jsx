import 'react'
import MessageInput from "./primitives/MessageInput.jsx";

export default function Messages() {
    return (
        <div className="chat-background flex flex-col h-screen justify-between">
            <header className="h-10 bg-red-500">Header</header>

            <main className="mb-auto h-10 bg-green-500">
                <ul>
                    <li>Message 1...</li>
                    <li>Message 2...</li>
                    <li>Message 3...</li>
                    <li>Message 4...</li>
                    <li>Message 5...</li>
                </ul>
            </main>

            <footer className="flex h-16 bg-white border-solid border-t border-yellow-200 justify-center">
                <span className="flex lg:w-2/3 sm:w-full items-center justify-center">
                    <MessageInput />
                </span>

            </footer>
        </div>

    )
}