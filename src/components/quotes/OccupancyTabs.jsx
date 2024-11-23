import {Transition} from "@headlessui/react";
import StandardCardViewList from "./SelectableList.jsx";
import classNames from "../../utils/classNames.js";
import occupancyLiteral from "../../utils/occupancyLiteral.js";
import {useRatePresenterContext} from "../../context/RatePresenterContext.jsx";

export default function OccupancyTabs() {
    const { parsedData, selectedTabId, setSelectedTabId } = useRatePresenterContext()

    const handleTabClick = (tabId) => {
        setSelectedTabId(tabId);
    };

    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    value={selectedTabId || ''}
                    onChange={(e) => handleTabClick(e.target.value)}
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                >
                    {parsedData.data.map((occupancy) => (
                        <option key={occupancy.occ_id} value={occupancy.occ_id}>
                            {occupancyLiteral(occupancy.adults, occupancy.children)}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav aria-label="Tabs" className="flex space-x-4">
                    {parsedData.data.map((tab) => (
                        <button
                            key={tab.occ_id}
                            onClick={() => handleTabClick(tab.occ_id)}
                            className={classNames(
                                tab.occ_id === selectedTabId
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'text-gray-500 hover:text-gray-700',
                                'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                        >
                            {occupancyLiteral(tab.adults, tab.children)}
                        </button>
                    ))}
                </nav>
            </div>
            <Transition
                show={true}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="mt-4">
                    {/*<pre>{JSON.stringify(parsedData.find(obj => obj.occ_id === selectedTabId), null, 2)}</pre>*/}
                    {selectedTabId && (
                        <StandardCardViewList
                            rooms={parsedData.data.find(obj => obj.occ_id === selectedTabId)?.rooms || []}
                        />
                    )}
                </div>
            </Transition>
        </div>
    );
}
