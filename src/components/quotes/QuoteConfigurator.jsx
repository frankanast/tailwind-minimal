import {PlayIcon} from "@heroicons/react/16/solid/index.js";
import BasicSolutionCard from "./BasicSolutionCard.jsx";
import AbstractSecondaryToolbar from "../abstract/toolbars/AbstractSecondaryToolbar.jsx";

const QuoteConfigurator = () => {

    return (
        <>
            <div>
                <div className="flex justify-between bg-white w-full px-3"> {/*px-4 py-5 sm:px-6*/}
                    <h3 className="text-base font-semibold leading-6 text-gray-900">2 adults</h3>
                    <div className="flex gap-2">
                        <button><PlayIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600 transform rotate-180" /></button>
                        <button><PlayIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600"/></button>
                    </div>
                </div>
                <BasicSolutionCard />
            </div>
        </>

    )
}

export default QuoteConfigurator;