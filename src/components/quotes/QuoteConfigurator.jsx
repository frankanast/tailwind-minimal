import {PlayIcon, ViewfinderCircleIcon} from "@heroicons/react/16/solid/index.js";
import RateGridElement from "./RateGridElement.jsx";
import { useQuoteContext } from "./QuoteContext.jsx";

import occupancyLiteral from "../../utils/occupancyLiteral.js";

const QuoteConfigurator = () => {
    const contextData = useQuoteContext()

    if (!contextData || !Array.isArray(contextData.loadedData)) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {/* Iterate over the occupancy array */}
            {contextData.loadedData.map((item) => (
                <div key={item.occupancy} className="mt-12">
                    <div className="flex justify-between bg-white w-full px-4">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Hello world</h3>
                        <div className="flex gap-2">
                            <button>
                                <PlayIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600 transform rotate-180"/>
                            </button>

                            <button>
                                <ViewfinderCircleIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600"/>
                            </button>

                            <button>
                                <PlayIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600"/>
                            </button>
                        </div>
                    </div>
                    <div style={{height: "350px"}}>
                        <RateGridElement data={item.gridData} />
                    </div>
                </div>
            ))}
        </>
    );
}

export default QuoteConfigurator;