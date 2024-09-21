import 'react'

export default function Avatar( {profileData, variant = "chat"} ) {
    // senderData = message.sender<obj>
    // We inject all styles, both for image and text.
    // If there is no image, we render text (initials); otherwise, text will be empty and picture shown.

    const variantClassnames = {
        chat: "chat-avatar flex-shrink-0",
        sidebar: "chat-avatar h-8 w-8 rounded-full",
    }

    return (
        <div
            className={variantClassnames[variant]}
            style={{
                backgroundImage: `url(${profileData?.profilePicUrl || "none"})`,
                backgroundColor: profileData?.hexColor || "black",
            }}>
            {!profileData?.profilePicUrl ? profileData?.initials : ""}
        </div>
    )
}
