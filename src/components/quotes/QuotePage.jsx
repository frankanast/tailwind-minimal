import QuoteRenderer from "./QuoteRenderer.jsx";
import QuoteToolbar from "./QuoteToolbar.jsx";
import QuoteConfigurator from "./QuoteConfigurator.jsx";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import QuoteSecondaryToolbar from "./QuoteSecondaryToolbar.jsx";
import { QuoteProvider } from "./QuoteContext.jsx";
import QuoteDrawer from "./QuoteDrawer.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RatePresenterProvider} from "./RatePresenterContext.jsx";

export default function QuotePage({ toggleHandler }) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <QuoteProvider>
                <div>
                    <div className="flex flex-col h-screen">
                            <QuoteToolbar toggleHandler={toggleHandler} drawerItem={<QuoteDrawer />} />
                            <PanelGroup direction="horizontal">
                                <Panel defaultSize={50} minSize={10} className="h-auto">
                                    <QuoteSecondaryToolbar />
                                    <div className="h-full w-full mt-10 flex flex-col overflow-auto">
                                        <RatePresenterProvider>
                                            <QuoteConfigurator />
                                        </RatePresenterProvider>
                                    </div>
                                </Panel>
                                <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-400" />
                                <Panel minSize={10}>
                                    <div className="preview-background h-full pt-14 overflow-auto">
                                        <QuoteRenderer />
                                    </div>
                                </Panel>
                            </PanelGroup>
                        </div>
                </div>
            </QuoteProvider>
        </QueryClientProvider>
    );
}
