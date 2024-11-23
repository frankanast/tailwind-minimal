import QuoteRenderer from "./QuoteRenderer.jsx";
import QuoteToolbar from "./QuoteToolbar.jsx";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ConfiguratorToolbar from "./ConfiguratorToolbar.jsx";
import { QuoteProvider } from "../../context/QuoteContext.jsx";
import QuoteDrawer from "./QuoteDrawer.jsx";
import {RatePresenterProvider} from "../../context/RatePresenterContext.jsx";
import Configurator from "./Configurator.jsx";
import {QuotePreviewProvider} from "../../context/QuotePreviewContext.jsx";

export default function QuotePage({ toggleHandler }) {

    return (
        <QuoteProvider>
            <RatePresenterProvider>
                <QuotePreviewProvider>
                    <div>
                        <div className="flex flex-col h-screen">
                            <QuoteToolbar toggleHandler={toggleHandler} drawerItem={<QuoteDrawer />} />
                            <ConfiguratorToolbar />  {/* Only visible if there is data */}
                            <PanelGroup direction="horizontal">
                                <Panel defaultSize={33} minSize={10} className="h-auto">
                                    <div className="h-full overflow-auto pt-10 pb-10">
                                        <Configurator /> {/*QuoteStandardConfigurator or QuoteTailoredConfigurator*/}
                                    </div>
                                </Panel>
                                <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-400" />
                                <Panel minSize={10}>
                                    <div className="static preview-background h-full pt-20 overflow-auto">
                                        <QuoteRenderer />
                                    </div>
                                </Panel>
                            </PanelGroup>
                        </div>
                    </div>
                </QuotePreviewProvider>
            </RatePresenterProvider>
        </QuoteProvider>
    );
}