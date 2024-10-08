import RoomSelector from "./RoomSelector.jsx";
import QuoteDatePicker from "./QuoteDatePicker.jsx";

export default function QuoteDrawer() {
    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0 lg:grid-cols-3 lg:gap-4 xl:gap-8 w-full h-auto bg-white">
            <span className="col-span-2">
                <QuoteDatePicker />
            </span>
            <div>
                <RoomSelector />
            </div>
        </div>
    )
}