import {TemplatesPage} from "./TemplatesPage.jsx";
import {TemplateOptionsEditor} from "./TemplateOptionsEditor.jsx";
import {TemplateDesignEditor} from "./TemplateDesignEditor.jsx";
import {TemplateCodeEditor} from "./TemplateCodeEditor.jsx";
import StateIndicator from "../abstract/StateIndicator.jsx";
import MagnifyingGlass from "../../assets/icons/MagnifyingGlass.jsx";

export const templateRoutes = [
    {
        path: '/templates',
        element: <TemplatesPage />,
        handle: { breadcrumb: 'Templates' },
        children: [
            {
                path: ':templateId',          // <-- your template parameter
                children: [
                    {
                        path: 'options',          // matches "/templates/:templateId/options"
                        element: <TemplateOptionsEditor />,
                    },
                    {
                        path: 'design',          // matches "/templates/:templateId/design"
                        element: <TemplateDesignEditor />,
                    },
                    {
                        path: 'source',          // matches "/templates/:templateId/source"
                        element: <TemplateCodeEditor />,
                    },
                    {
                        // Optional: Show something if user visits just "/templates/:templateId"
                        index: true,
                        element: (
                            <div className="p-4 text-gray-500">
                                Select “Options,” “Design,” or “Source.”
                            </div>
                        )
                    }
                ],
            },
            {
                // (Optional) If user visits "/templates" without any templateId:
                index: true,
                element: (
                    <StateIndicator
                        svg={MagnifyingGlass()}
                        abstract="Please select a template from the list."
                        headline="No selection"
                    />
                ),
            },
        ],
    },
];
