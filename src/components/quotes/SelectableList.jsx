import "react";
import { useRatePresenterContext } from "./RatePresenterContext.jsx";
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid";
import BoxIcon from "../../assets/BoxIcon.jsx";
import {Fragment} from "react";
import classNames from "../../utils/classNames.js";
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
            <div
                onClick={onClick}
                className="cursor-pointer flex justify-between items-center"
            >
                {children}
                <span className={classNames('size-5', selected ? 'text-yellow-600' : 'text-gray-400')}>
                    <EllipsisVerticalIcon />
                </span>

            </div>
        </Card>
    );
};

const RoomCard = ({ room }) => {
    const {selectedItems, setSelectedItems} = useRatePresenterContext();
    const isSelected = selectedItems.includes(room.entity_id);

    const handleSelect = () => {
        const newSelection = isSelected
            ? selectedItems.filter((id) => id !== room.entity_id)
            : [...selectedItems, room.entity_id];
        setSelectedItems(newSelection);
    };

    return (
        <SelectableCard onClick={handleSelect} selected={isSelected}>
            <div>
                <h1 className="text-lg font-semibold">{room.data.name.en}</h1>
                <div className="text-sm text-gray-500 space-y-2">
                    {room.rates.map((rate) => (
                        <div key={rate.id}>
                            {rate.data.is_package ? <BoxIcon className='size-4 inline mr-2' /> : <Fragment />}
                            <span className="font-medium align-middle">{rate.data.name}:</span> {formatToEuro(rate.amount, "precise")}
                        </div>
                    ))}
                </div>
            </div>
        </SelectableCard>
    );
};

const StandardCardViewList = ({ rooms }) => {
    return (
        <div className="grid gap-4">
            {rooms.map((room) => (
                <RoomCard key={room.entity_id} room={room} />
            ))}
        </div>
    );
};

export default StandardCardViewList;

