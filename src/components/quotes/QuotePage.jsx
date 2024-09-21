import {PhoneIcon, PlayCircleIcon, RectangleGroupIcon} from "@heroicons/react/20/solid/index.js";
import MagnifyingGlass from "../../assets/MagnifyingGlass.jsx";
import StateIndicator from "../abstract/StateIndicator.jsx";
import isEmpty from "../../utils/isEmpty.js";
import QuoteRenderer from "./QuoteRenderer.jsx";
import QuoteToolbar from "./QuoteToolbar.jsx";
import QuoteConfigurator from "./QuoteConfigurator.jsx";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import AbstractSecondaryToolbar from "../abstract/toolbars/AbstractSecondaryToolbar.jsx";

// const quoteCallsToAction = [
//     { name: 'Dates and rooms', href: '#', icon: PlayCircleIcon },
//     { name: 'Details', href: '#', icon: PhoneIcon },
//     { name: 'Load rates', href: '#', icon: RectangleGroupIcon },
// ]

export default function QuotePage(toggleHandler) {
    return (
        <div>
            {isEmpty({hello: 'world'}) ?
                <div className="flex flex-col">
                    <StateIndicator
                        svg={MagnifyingGlass()}
                        headline="No rooms to show"
                        abstract="Get started by searching for new dates."
                    />
                </div>
                :
                <div className="flex flex-col h-screen">
                    <QuoteToolbar toggleHandler={toggleHandler} />
                    <PanelGroup direction="horizontal">
                        <Panel defaultSize={50} minSize={10} className="h-auto">
                            <AbstractSecondaryToolbar />
                            <div className="h-full w-full mt-10 flex flex-col overflow-auto">
                                <QuoteConfigurator />
                            </div>
                        </Panel>
                        <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-400"/>
                        <Panel minSize={10}>
                            <div className="preview-background h-full pt-14 overflow-auto">
                                <QuoteRenderer props={{url: "https://programmino-be.onrender.com/test-html"}}/>
                            </div>
                        </Panel>
                    </PanelGroup>
                </div>
            }
        </div>
    )
}