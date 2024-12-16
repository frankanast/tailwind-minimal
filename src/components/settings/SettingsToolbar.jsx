import {HomeIcon} from "@heroicons/react/20/solid/index.js";
import {Link, NavLink, useMatches} from "react-router-dom";


export default function SettingsToolbar() {
    const matches = useMatches()

    const breadcrumbs = matches
        .filter((match) => match.handle?.breadcrumb) // Ensure route has breadcrumb metadata
        .map((match) => {
            const { breadcrumb } = match.handle;
            const label = typeof breadcrumb === "function" ? breadcrumb(match) : breadcrumb;

            return { id: match.pathname, label, path: match.pathname };
        });

    return (
        <div
            className="sticky flex top-0 z-40 h-16 shrink-0 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8"
        >

            <nav aria-label="Template creation steps"
                 className="flex overflow-x-auto w-full py-4">
                <ol
                    role="list"
                    className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                >
                    {breadcrumbs.map((page, index) => {
                        const isFirst = index === 0 // Home

                        return (
                            <>
                                <li key={page.id} className="flex">
                                    {isFirst ? (
                                        <NavLink to="/settings" className="text-gray-400 hover:text-gray-500">
                                            <HomeIcon aria-hidden="true" className="h-5 w-5 mt-1 flex-shrink-0"/>
                                            <span className="sr-only">Home</span>
                                        </NavLink>
                                    ) : (
                                        <div className="flex items-center">
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 24 44"
                                                preserveAspectRatio="none"
                                                aria-hidden="true"
                                                className="h-full w-6 flex-shrink-0 text-gray-200"
                                            >
                                                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z"/>
                                            </svg>
                                            <Link
                                                to={page.to}
                                                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                            >
                                                {page.label}
                                            </Link>
                                        </div>
                                    )}
                                </li>
                            </>
                        )
                    })}
                </ol>
            </nav>
        </div>
    )
}