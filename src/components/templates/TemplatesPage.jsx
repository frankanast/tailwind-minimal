import 'react'
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import TemplatesList from "./TemplatesList.jsx";
import TemplateEditor from "./TemplateEditor.jsx";
import {ChevronDownIcon} from "@heroicons/react/16/solid/index.js";


export function TemplatesPage() {
    return (
        <div >
            {/* Mobile: Dropdown templates (component is responsive) */}
            <div className="grid grid-cols-1 sm:hidden">
                <TemplatesList />
                <TemplateEditor />
            </div>

            {/* Desktop: Panel view with templates list and tabs */}
            <div className="hidden h-screen sm:block">
                <PanelGroup direction="horizontal" className="flex h-full flex-col">
                    <Panel defaultSize={35} minSize={10} >
                        <TemplatesList/>
                    </Panel>
                    <PanelResizeHandle className="w-1 bg-gray-200 hover:bg-gray-400" />
                    <Panel>
                        <TemplateEditor />
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    )
}
