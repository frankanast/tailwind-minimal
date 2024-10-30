import "react";
import { useRatePresenterContext } from "./RatePresenterContext.jsx";
import BoxIcon from "../../assets/BoxIcon.jsx";
import {Fragment} from "react";
import classNames from "../../utils/classNames.js";
import formatToEuro from "../../utils/formatToEuro.js";
import {EllipsisVerticalIcon, TagIcon, EyeSlashIcon} from "@heroicons/react/24/outline/index.js";

const Card = ({ children, selected }) => {
    const baseClasses = "overflow-hidden rounded-md bg-white px-6 py-4 shadow";
    const selectedClasses = selected ? "ring-2 ring-inset ring-yellow-400 bg-yellow-50" : "";
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
                <h1 className="text-lg text-gray-700 font-semibold">{room.data.name.en}</h1>
                <div className="text-sm text-gray-500 space-y-2">
                    {room.rates.map((rate) => (
                        <div key={rate.id}>
                            <div className='inline mr-2'>
                                {[
                                    { condition: rate.data.is_package, icon: <BoxIcon className="size-4 inline" /> },
                                    { condition: rate.data.is_special_offer, icon: <TagIcon className="size-4 inline" /> },
                                    { condition: rate.data.is_private_sale, icon: <EyeSlashIcon className="size-4 inline" /> }
                                ].map(
                                    (item, index) =>
                                        item.condition && (
                                            <Fragment key={index}>
                                                {item.icon}
                                            </Fragment>
                                        )
                                )}
                                <span className="font-medium align-middle">{rate.data.name}:</span> {formatToEuro(rate.amount, "precise")}
                            </div>
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

