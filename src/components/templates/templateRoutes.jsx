import {TemplatesPage} from "./TemplatesPage.jsx";
import {TemplateOptionsEditor} from "./TemplateOptionsEditor.jsx";
import {TemplateContentEditor} from "./TemplateContentEditor.jsx";
import StateIndicator from "../abstract/StateIndicator.jsx";
import MagnifyingGlass from "../../assets/icons/MagnifyingGlass.jsx";
import {TemplateProvider} from "../../context/TemplatesContext.jsx";

export const templateRoutes = [
    {
        path: '/templates',
        element: <TemplateProvider><TemplatesPage /></TemplateProvider>,
        handle: { breadcrumb: 'Templates' },
        children: [
            {
                path: ':templateId',
                children: [
                    {
                        path: 'options',
                        element: <TemplateOptionsEditor />,
                    },
                    {
                        path: 'design',
                        element: <TemplateContentEditor />,
                    },
                    {
                        // Show 'Options' if user visits just "/templates/:templateId"
                        index: true,
                        element: (
                            <TemplateOptionsEditor />
                        )
                    }
                ],
            },
            {
                // If user visits "/templates" without any templateId:
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
