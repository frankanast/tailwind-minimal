import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid/index.js";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

const Card = ({ children, selected }) => {
    // TODO: should we make it compound component?
    const baseClasses = "overflow-hidden rounded-md bg-white px-6 py-4 shadow";
    const selectedClasses = selected
        ? "ring-2 ring-inset ring-yellow-600"
        : "";
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

const SelectableTitleCard = ({ title, description, selected, onClick }) => {
    return (
        <SelectableCard onClick={onClick} selected={selected}>
            <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                {description.map((rate) => (
                    <p key={rate.rate_id.id} className="text-gray-500">{`${rate.rate_id.data.abbreviation}: ${rate.amount}`}</p>
                ))}
            </div>
        </SelectableCard>
    );
};

const SelectableCardList = ({ contents, multiple, maxSelectable, onChange }) => {
    const [selected, setSelected] = useState(multiple ? [] : -1);

    if (!maxSelectable) {
        maxSelectable = contents ? contents.length : 0;
    }

    const onItemSelected = (index) => {
        if (multiple) {
            let selectedIndexes = [...selected]; // TODO: this should be handled within a context
            const selectedIndex = selectedIndexes.indexOf(index); // TODO: this should be handled within a context

            if (selectedIndex > -1) {
                selectedIndexes.splice(selectedIndex, 1);
            } else if (selectedIndexes.length < maxSelectable) {
                selectedIndexes.push(index);
            }

            setSelected(selectedIndexes);
            onChange(selectedIndexes);
        } else {
            setSelected(index);
            onChange(index);
        }
    };

    return (
        <div className="grid gap-4">
            {contents.map((cardContent, i) => {
                const { title, description } = cardContent;
                const isSelected = multiple
                    ? selected.indexOf(i) > -1
                    : selected === i;

                return (
                    <SelectableTitleCard
                        key={i}
                        title={title}
                        description={description}
                        selected={isSelected}
                        onClick={() => onItemSelected(i)}
                    />
                );
            })}
        </div>
    );
};

export default SelectableCardList;
