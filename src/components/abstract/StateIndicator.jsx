import 'react'
import {Fragment} from "react";

export default function StateIndicator({svg, headline, abstract}) {
    return (
        // 6rem is the height of a standard AbstractToolbar implementation... I didn't find any better method to handle this
        <div className="flex flex-col overflow-hidden" style={{height: 'calc(100vh - 6rem)'}}>
            <div className="h-1/3"/>

            <div className="h-1/3 flex flex-col text-center justify-center">
                {svg || Fragment}

                <h3 className="mt-2 text-sm font-semibold text-gray-900">{headline}</h3>
                <p className="mt-1 text-sm text-gray-500">{abstract}</p>
            </div>

            <div className="h-1/3" />
        </div>
    )
}
