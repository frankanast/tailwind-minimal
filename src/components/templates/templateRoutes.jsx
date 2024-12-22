import {TemplatesPage} from "./TemplatesPage.jsx";
import StateIndicator from "../abstract/StateIndicator.jsx";
import MagnifyingGlass from "../../assets/icons/MagnifyingGlass.jsx";
import {TemplateOptionsEditor} from "./TemplateOptionsEditor.jsx";
import {TemplateDesignEditor} from "./TemplateDesignEditor.jsx";
import {TemplateCodeEditor} from "./TemplateCodeEditor.jsx";

export const templateRoutes =
    [
        {
            path: '/templates',
            element: <TemplatesPage />,
            handle: { breadcrumb: 'Templates' },
            children: [
                {
                    path: ':templateId',
                    element: <StateIndicator
                        headline="No template to show"
                        abstract="Select a template from the list to get started."
                        svg={MagnifyingGlass()}
                    />,
                    children: [

                    ]
                },
                {
                    path: ':templateId/options',
                    element: <TemplateOptionsEditor />,
                },
                {
                    path: ':templateId/design',
                    element: <TemplateDesignEditor />,
                },
                {
                    path: ':templateId/source',
                    element: <TemplateCodeEditor />,
                }
            ]
        }
    ]
