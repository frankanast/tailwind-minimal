import 'react'

export default function Avatar( {senderData} ) {
    // senderData = message.sender<obj>
    // We inject all styles, both for image and text.
    // If there is no image, we render text (initials); otherwise, text will be empty and picture shown.
    return (
        <div
            className="chat-avatar flex-shrink-0"
            style={{
                backgroundImage: `url(${senderData.profile_pic || "none"})`,
                backgroundColor: senderData.hexColor || "black",
            }}>
            {!senderData.profile_pic ? senderData.initials : ""}
        </div>
    )
}
