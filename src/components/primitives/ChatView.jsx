import 'react'

export default function ChatView({ data = [], currentUser }) {
    // For chat styling, we use custom CSS and limit TailwindCSS use only for colors and consistency.

    return (
        <div>
            {data.map((item) => {
                const direction = (item.sender.name === currentUser) ? 'outgoing' : 'incoming'  // In production this would be handled from settings (current logged user)
                const className = `chat-message ${direction} flex flex-col gap-10`

                return (
                    <div
                        className={className}
                        key={item.id}
                    >
                        {item.message.content}
                    </div>
                )
            })}
        </div>
    )
}
