import StateIndicator from "../abstract/StateIndicator.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid/index.js";
import {Link} from "react-router-dom";

export default function SettingsNotFoundPage() {
    return (
        <div>
            <StateIndicator
                svg={<MagnifyingGlassIcon />}
                headline="Error occurred"
                abstract="This Setting configuration page was not found. Please contact the Developer."
            />
            <Link to="/">Back to home</Link>
        </div>
    )
}