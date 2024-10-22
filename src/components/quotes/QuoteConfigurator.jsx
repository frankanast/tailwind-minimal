import { PlayIcon, ViewfinderCircleIcon } from "@heroicons/react/16/solid/index.js";
import { useQuoteContext } from "./QuoteContext.jsx";
import { useEffect, useState } from "react";
import EmptyStateIndicator from "../abstract/StateIndicator.jsx";
import MagnifyingGlass from "../../assets/MagnifyingGlass.jsx";
import LoadingIcon from "../../assets/LoadingIcon.jsx";
import SelectableCardList from "../abstract/SelectableList.jsx";
import cleanUpResponse from "../../utils/cleanUpResponse.js";
import groupRatesForPresentation from "../../utils/groupRatesForPresentation.js";
import occupancyLiteral from "../../utils/occupancyLiteral.js";

const QuoteConfigurator = () => {
    let { loadedData, isFetching } = useQuoteContext();
    const [parsedData, setParsedData] = useState({});

    const [activeOccupancy, setActiveOccupancy] = useState(undefined);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (loadedData && Object.keys(loadedData).length > 0) {
            const parsed = groupRatesForPresentation(cleanUpResponse(loadedData));
            setParsedData(parsed);

            const firstOccupancyKey = Object.keys(parsed)[0];
            setActiveOccupancy({ occupancyKey: firstOccupancyKey, gridData: parsed[firstOccupancyKey] });
        }
    }, [loadedData]);


    const onNextPressed = () => {
        setActiveOccupancy((prevActiveGrid) => {
            const keys = Object.keys(parsedData);
            const currentIndex = keys.findIndex(key => key === prevActiveGrid.occupancyKey);
            const nextIndex = (currentIndex + 1) % keys.length;
            return { occupancyKey: keys[nextIndex], gridData: parsedData[keys[nextIndex]] };
        });
    };

    const onPreviousPressed = () => {
        setActiveOccupancy((prevActiveGrid) => {
            const keys = Object.keys(parsedData);
            const currentIndex = keys.findIndex(key => key === prevActiveGrid.occupancyKey);
            const previousIndex = (currentIndex - 1 + keys.length) % keys.length;
            return { occupancyKey: keys[previousIndex], gridData: parsedData[keys[previousIndex]] };
        });
    };

    const onListChanged = (selectedItems) => {
        setSelected(selectedItems);
    };

    // TODO: Mockup for development
    const submit = () => {
        window.alert("Selected: " + JSON.stringify(selected));
    };

    if (!activeOccupancy) {
        return (
            <div className="flex flex-col">
                <EmptyStateIndicator
                    svg={MagnifyingGlass()}
                    headline="No rooms to show"
                    abstract="Get started by searching for new dates."
                />
            </div>
        );
    }

    if (isFetching) {
        return (
            <div className="mt-8 w-8 mx-auto">
                <LoadingIcon height={12} width={12} />
            </div>
        );
    }

    const rates = activeOccupancy?.gridData.rooms.map((room) => ({
        title: room.roomShortName,
        description: room.rates
    }));

    return (
        <div className="mt-8">
            <div className="flex justify-between bg-white w-full px-4">
                <h2 className="text-lg font-semibold leading-6 text-gray-900">
                    {occupancyLiteral(activeOccupancy?.gridData.adults, activeOccupancy?.gridData.children)}
                </h2>

                <div className="flex gap-2">
                    <button onClick={onPreviousPressed}>
                        <PlayIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600 transform rotate-180" />
                    </button>

                    <button>
                        <ViewfinderCircleIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600" />
                    </button>

                    <button onClick={onNextPressed}>
                        <PlayIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600" />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <SelectableCardList
                    multiple={true}
                    contents={rates}
                    onChange={onListChanged}
                />
                <button
                    className="bg-lavender-700 text-white px-4 py-2 rounded-md shadow"
                    onClick={submit}
                >
                    DEVMODE - Get selected
                </button>
            </div>
        </div>
    );
};

export default QuoteConfigurator;
