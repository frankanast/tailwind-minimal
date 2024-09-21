import 'react';
import {Fragment} from "react";
import {nanoid} from "nanoid";
import toolbarStyles from "../components/abstract/toolbars/toolbarStyles.js";


// Custom CSS class 'toolbar-scroll' handles the appearance of scrollbar in case of overflow
export default function AbstractStaticToolbar({ items }) {
    return (
        <div className="toolbar-scroll flex flex-1 gap-x-4 items-center lg:gap-x-6 overflow-x-auto overflow-y-hidden">
            <form className="relative flex flex-1 items-center">
                {/* Content section */}
                {items.map((item) => (
                    <span key={nanoid()} className={toolbarStyles[item.styleLiteral || "label"]}>{item.component || Fragment}</span>
                ))}
                {/* End of content section */}
            </form>
        </div>
    );
}
