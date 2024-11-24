import { useQuoteContext } from "../../context/QuoteContext.jsx";
import { useEffect, useState } from "react";
import EmptyStateIndicator from "../abstract/StateIndicator.jsx";
import MagnifyingGlass from "../../assets/MagnifyingGlass.jsx";
import LoadingIcon from "../../assets/LoadingIcon.jsx";
import {useRatePresenterContext} from "../../context/RatePresenterContext.jsx";
import OccupancyTabs from "./OccupancyTabs.jsx";

const QuoteStandardConfigurator = () => {
    let { isFetching } = useQuoteContext();
    let { parsedData } = useRatePresenterContext();

    const [activeOccupancy, setActiveOccupancy] = useState(undefined);

    useEffect(() => {
        if (parsedData.data && Object.keys(parsedData.data).length > 0) {
            const firstOccupancyKey = Object.keys(parsedData.data)[0];
            const firstOccupancy = parsedData.data[firstOccupancyKey];
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
            <LoadingIcon className="mt-8 w-8 mx-auto"/>
        );
    }

    return (
        <div className="flex flex-col px-4">
            <OccupancyTabs />
        </div>
    );
};

export default QuoteStandardConfigurator;
