import 'react'
import {useTemplateContext} from "../../context/TemplatesContext.jsx";
import TemplateDesigner from "../abstract/TemplateDesigner.tsx";

export function TemplateOptionsEditor() {
    const {isCurrentlyEditingTemplate, versions} = useTemplateContext();

    return (
        <div>
            Options - versions: {JSON.stringify(versions)}
        </div>
    );
};