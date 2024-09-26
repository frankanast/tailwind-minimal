import MagnifyingGlass from "../../assets/MagnifyingGlass.jsx";
import StateIndicator from "../abstract/StateIndicator.jsx";
import isEmpty from "../../utils/isEmpty.js";
import QuoteRenderer from "./QuoteRenderer.jsx";
import QuoteToolbar from "./QuoteToolbar.jsx";
import QuoteConfigurator from "./QuoteConfigurator.jsx";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import QuoteSecondaryToolbar from "./QuoteSecondaryToolbar.jsx";
import { QuoteContext } from "./QuoteContext.jsx";
import {useState} from "react";

export default function QuotePage({ toggleHandler }) {
    const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
    const [occupancy, setOccupancy] = useState({ adults: 2, children: 0 });
    const [rates, setRates] = useState([]);

    return (
        <QuoteContext.Provider value={{dates, setDates, occupancy, setOccupancy, rates, setRates}}>
            <div>
                {isEmpty({hello:"world"}) ? (
                    <div className="flex flex-col">
                        <StateIndicator
                            svg={MagnifyingGlass()}
                            headline="No rooms to show"
                            abstract="Get started by searching for new dates."
                        />
                    </div>
                ) : (
                    <div className="flex flex-col h-screen">
                        <QuoteToolbar toggleHandler={toggleHandler} />
                        <PanelGroup direction="horizontal">
                            <Panel defaultSize={50} minSize={10} className="h-auto">
                                <QuoteSecondaryToolbar />
                                <div className="h-full w-full mt-10 flex flex-col overflow-auto">
                                    <QuoteConfigurator />
                                </div>
                            </Panel>
                            <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-400" />
                            <Panel minSize={10}>
                                <div className="preview-background h-full pt-14 overflow-auto">
                                    <QuoteRenderer props={{ url: "http://127.0.0.1:8000/test-html" }} />
                                </div>
                            </Panel>
                        </PanelGroup>
                    </div>
                )}
            </div>
        </QuoteContext.Provider>
    );
}
