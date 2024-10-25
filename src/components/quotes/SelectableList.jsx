import "react";
import { useRatePresenterContext } from "./RatePresenterContext.jsx";

const Card = ({ children, selected }) => {
    const baseClasses = "overflow-hidden rounded-md bg-white px-6 py-4 shadow";
    const selectedClasses = selected ? "ring-2 ring-inset ring-yellow-600" : "";
    const className = `${baseClasses} ${selectedClasses}`;
    return <div className={className}>{children}</div>;
};

const SelectableCard = ({ selected, onClick, children }) => {
    return (
        <Card selected={selected}>
            <div
                onClick={onClick}
                className="cursor-pointer flex justify-between items-center"
            >
                {children}
                {selected && (
                    <div className="text-yellow-600">
                        <span className="text-xl">✔</span>
                    </div>
                )}
            </div>
        </Card>
    );
};

const RoomCard = ({ room, selected, onClick }) => {
    return (
        <SelectableCard onClick={onClick} selected={selected}>
            <div>
                <h1 className="text-lg font-semibold">{room.data.name.en}</h1>
                <div className="text-sm text-gray-500 space-y-2">
                    {room.rates.map((rate) => (
                        <div key={rate.id}>
                            <span className="font-medium">{rate.data.name}:</span> ${rate.amount}
                        </div>
                    ))}
                </div>
            </div>
        </SelectableCard>
    );
};

const RoomSelectableCardList = ({ rooms }) => {
    const { selected = [], setSelected } = useRatePresenterContext();

    const onRoomSelected = (entityId) => {
        if (!Array.isArray(selected)) {
            console.error("Expected 'selected' to be an array, but got:", selected);
            return;
        }

        const isSelected = selected.includes(entityId);
        const newSelection = isSelected
            ? selected.filter((id) => id !== entityId)
            : [...selected, entityId];
        setSelected(newSelection);
    };

    return (
        <div className="grid gap-4">
            {rooms.map((room) => {
                const isSelected = selected.includes(room.entity_id);
                return (
                    <RoomCard
                        key={room.entity_id}
                        room={room}
                        selected={isSelected}
                        onClick={() => onRoomSelected(room.entity_id)}
                    />
                );
            })}
        </div>
    );
};

export default RoomSelectableCardList;

