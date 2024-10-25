import { useQuoteContext } from "./QuoteContext.jsx";
import { useEffect, useState } from "react";
import EmptyStateIndicator from "../abstract/StateIndicator.jsx";
import MagnifyingGlass from "../../assets/MagnifyingGlass.jsx";
import LoadingIcon from "../../assets/LoadingIcon.jsx";
import SelectableCardList from "./SelectableList.jsx";
import {useRatePresenterContext} from "./RatePresenterContext.jsx";
import OccupancyTabs from "./OccupancyTabs.jsx";

const QuoteConfigurator = () => {
    let { isFetching } = useQuoteContext();
    let { parsedData, selection, selected, setSelected } = useRatePresenterContext();

    const [activeOccupancy, setActiveOccupancy] = useState(undefined);

    useEffect(() => {
        if (parsedData && Object.keys(parsedData).length > 0) {
            const firstOccupancyKey = Object.keys(parsedData)[0];
            const firstOccupancy = parsedData[firstOccupancyKey];
            setActiveOccupancy({ occupancyKey: firstOccupancy.occ_id, roomsData: firstOccupancy.rooms });
        }
    }, [parsedData]);

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

    return (
        <div className="flex flex-col px-4">
            <OccupancyTabs />
        </div>
    );
};

export default QuoteConfigurator;
