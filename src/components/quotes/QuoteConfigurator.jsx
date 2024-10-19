import {PlayIcon, ViewfinderCircleIcon} from "@heroicons/react/16/solid/index.js";
import { useQuoteContext } from "./QuoteContext.jsx";
import {AgGridReact} from "ag-grid-react";
import {useRatePresenterContext} from "./RatePresenterContext.jsx";
import {useEffect, useState} from "react";
import occupancyLiteral from "../../utils/occupancyLiteral.js";
import EmptyStateIndicator from "../abstract/StateIndicator.jsx";
import MagnifyingGlass from "../../assets/MagnifyingGlass.jsx";
import LoadingIcon from "../../assets/LoadingIcon.jsx";

const QuoteConfigurator = () => {
    let {
        loadedData,
        isFetching,
    } = useQuoteContext()  // a list of 'occupancy' --> a list of rate grids

    const {
        brandTheme,
        selectionMode,
    } = useRatePresenterContext()

    const [activeGrid, setActiveGrid] = useState(undefined)
    useEffect(() => {
        // Set the first grid as active once loadedData is available
        if (loadedData && loadedData.length > 0) {
            setActiveGrid(loadedData[0]);
        }
    }, [loadedData]);

    const onNextPressed = () => {
        setActiveGrid((prevActiveGrid) => {
            const currentIndex = loadedData.findIndex(grid => grid.id === prevActiveGrid.id);
            if (currentIndex === -1) {
                return loadedData[0];
            }

            const nextIndex = (currentIndex + 1) % loadedData.length;
            return loadedData[nextIndex];
        });
    };

    const onPreviousPressed = () => {
        setActiveGrid((prevActiveGrid) => {
            const currentIndex = loadedData.findIndex(grid => grid.id === prevActiveGrid.id);

            if (currentIndex === -1) {
                return loadedData[0];
            }
            const previousIndex = (currentIndex - 1 + loadedData.length) % loadedData.length;
            return loadedData[previousIndex];
        });
    };

    if (!activeGrid) {
        // No data (initial state)
        return (
            <div className="flex flex-col">
                <EmptyStateIndicator
                    svg={MagnifyingGlass()}
                    headline="No rooms to show"
                    abstract="Get started by searching for new dates."
                />
            </div>
        )
    }

    if (isFetching) {
        return (
            <div className="mt-8 w-8 mx-auto">
                <LoadingIcon height={12} width={12} />
            </div>
        )
    }

    return (
        <>
            <div className='mt-8'>
                <div className="flex justify-between bg-white w-full px-4">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        {occupancyLiteral(activeGrid?.occupancy.adults, activeGrid?.occupancy.children)}
                    </h3>

                    <div className="flex gap-2">
                        <button onClick={onPreviousPressed}>
                            <PlayIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600 transform rotate-180"/>
                        </button>

                        <button>
                            <ViewfinderCircleIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600"/>
                        </button>

                        <button onClick={onNextPressed}>
                            <PlayIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600"/>
                        </button>
                    </div>
                </div>
                <div style={{height: "350px"}}>
                    <div className='h-full'>
                        <AgGridReact
                            rowData={activeGrid?.rows}
                            columnDefs={activeGrid?.columns}
                            theme={brandTheme}
                            selection={selectionMode}
                            loadThemeGoogleFont
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuoteConfigurator;