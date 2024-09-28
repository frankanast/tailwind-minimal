import {PlayIcon, ViewfinderCircleIcon} from "@heroicons/react/16/solid/index.js";
import BasicSolutionPresenter from "./BasicSolutionPresenter.jsx";

const QuoteConfigurator = () => {

    return (
        <>
            <div className="h-full">
                <div className="flex justify-between bg-white w-full px-4">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">2 adults</h3>
                    <div className="flex gap-2">
                        <button><PlayIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600 transform rotate-180" /></button>
                        <button><ViewfinderCircleIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600" /></button>
                        <button><PlayIcon className="h-3 w-auto text-gray-400 hover:text-indigo-600"/></button>
                    </div>
                </div>
                <div className="h-2/3">
                    <BasicSolutionPresenter />
                </div>
            </div>
        </>

    )
}

export default QuoteConfigurator;