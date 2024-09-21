import 'react'

// CustomerLogoImg is a component that expects to find an image called customer_logo_img.png at root folder.
// As this is a very basic component and needs to be accessed from everywhere, even before login,
// We made it this way so that no props are necessary (and we reduce the risk of undefined etc.)
function CustomerLogoImg() {
    return (
        <div className="flex h-16 shrink-0 items-center">
            <img
                alt="Hotel Logo"
                src={"customer_logo_img.png"}
                className="h-8 w-auto"
            />
        </div>
    )
}

export default CustomerLogoImg;