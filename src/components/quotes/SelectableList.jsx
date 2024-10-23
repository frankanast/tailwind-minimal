import { useRatePresenterContext } from "./RatePresenterContext.jsx";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import formatToEuro from "../../utils/formatToEuro.js";

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
                <EllipsisVerticalIcon className="size-5 text-gray-400" />
            </div>
        </Card>
    );
};

const SelectableTitleCard = ({ room, rates, selected, onClick }) => {
    return (
        <SelectableCard onClick={onClick} selected={selected}>
            <div>
                <h3 className="text-sm font-semibold">{room}</h3>
                {rates.map((rate) => (
                    <p key={rate.rate_id.id} className="text-gray-500">
                        {`${rate.rate_id.data.abbreviation}: ${formatToEuro(rate.amount)}`}
                    </p>
                ))}
            </div>
        </SelectableCard>
    );
};

const SelectableCardList = () => {
    const { parsedData, selectedRates, toggleRateSelection } = useRatePresenterContext();

    // Flatten parsedData to get the list of rooms (assuming rooms are nested within occupancy data)
    const contents = Object.values(parsedData).flatMap((occupancy) => occupancy.rooms);

    // Function to handle item selection, calling toggleRateSelection from the context
    const onItemSelected = (uniqueCardId) => {
        toggleRateSelection(uniqueCardId);
    };

    return (
        <div className="grid gap-4">
            {contents.map((cardContent) => {
                const { roomShortName, uniqueCardId, rates } = cardContent; // Use uniqueCardId
                const isSelected = selectedRates.includes(uniqueCardId);

                return (
                    <SelectableTitleCard
                        key={uniqueCardId}
                        room={roomShortName}
                        rates={rates}
                        selected={isSelected}
                        onClick={() => onItemSelected(uniqueCardId)} // Call onItemSelected with uniqueCardId
                    />
                );
            })}
        </div>
    );
};

export default SelectableCardList;
