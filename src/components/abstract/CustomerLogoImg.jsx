import 'react'

function CustomerLogoImg({ className }) {
    return (
        <div className="flex h-16 shrink-0 items-center">
            <img
                alt="Hotel Logo"
                src="https://programmino-be.onrender.com/download_pic/f1ee106a-ff40-408c-8e26-9e94c472ad0b.png"
                className={className || "h-8 w-auto"}
            />
        </div>
    )
}

export default CustomerLogoImg;