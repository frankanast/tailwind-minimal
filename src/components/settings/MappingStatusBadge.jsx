import classNames from "../../utils/classNames.js";
import {useSettingsContext} from "../../context/SettingsContext.jsx";

export default function MappingStatusBadge({id}) {
    const {statuses} = useSettingsContext();
    const status = statuses.find(status => status.id === id);

    return (
        <p
            className={classNames(
                'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                (status ? status.style : "")
            )}
        >
            {status ? status.name : "???"}
        </p>
    );
}
