import 'react'
import Events from "../Events.jsx";


export default function DateRangePopover() {
    return (
        <>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <Events variant='compact' />
                </div>

            </div>
        </>
    )
}
