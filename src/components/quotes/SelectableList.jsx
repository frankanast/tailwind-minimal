import { useRatePresenterContext } from './RatePresenterContext.jsx';
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

const Card = ({ children, selected }) => {
    const baseClasses = "overflow-hidden rounded-md bg-white px-6 py-4 shadow";
    const selectedClasses = selected ? "ring-2 ring-inset ring-yellow-600" : "";
    const className = `${baseClasses} ${selectedClasses}`;
    return <div className={className}>{children}</div>;
};

const SelectableCard = ({ selected, onClick, children }) => {
    return (
        <Card selected={selected}>
            <div onClick={onClick} className="cursor-pointer flex justify-between items-center">
                {children}
                <EllipsisVerticalIcon className="w-5 h-5 text-gray-400" />
            </div>
        </Card>
    );
};

const SelectableTitleCard = ({ room, rates, selected, onClick }) => {
    return (
        <SelectableCard onClick={onClick} selected={selected}>
            <div>
                <h3 className="text-sm font-semibold">{room.data.name.en}</h3>
                <div className="mt-2">
                    {rates.map((rate) => (
                        <p key={rate.id} className="text-gray-500">
                            {`${rate.data.abbreviation}: €${rate.amount}`}
                        </p>
                    ))}
                </div>
            </div>
        </SelectableCard>
    );
};

const SelectableCardList = () => {
    const { parsedData, selectedRates, toggleRateSelection } = useRatePresenterContext();

    // Ensure parsedData is defined and is an array before flattening
    const rooms = parsedData ? parsedData.flatMap((occupancy) => occupancy.rooms) : [];

    // Ensure selectedRates is defined before using includes
    const selectedRatesArray = selectedRates || [];

    // Function to handle item selection, calling toggleRateSelection from the context
    const onItemSelected = (roomId) => {
        toggleRateSelection(roomId);
    };

    return (
        <div className="grid gap-4">
            {rooms.map((room) => {
                const isSelected = selectedRatesArray.includes(room.entity_id);

                return (
                    <SelectableTitleCard
                        key={room.entity_id}
                        room={room}
                        rates={room.rates}
                        selected={isSelected}
                        onClick={() => onItemSelected(room.entity_id)}
                    />
                );
            })}
        </div>
    );
};

export default SelectableCardList;
