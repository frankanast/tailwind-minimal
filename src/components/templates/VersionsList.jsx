import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import LoadingIcon from "../../assets/icons/LoadingIcon.jsx";
import StateIndicator from "../abstract/StateIndicator.jsx";
import {nanoid} from "nanoid";
import getCountryFlag from "../../utils/getCountryFlag.jsx";

export default function VersionsList() {
    const {templateId} = useParams()
    const [versions, setVersions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchVersions() {
            try {
                const response = await fetch(`https://programmino-be.onrender.com/template/versions/${templateId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch versions')
                }

                const data = await response.json()
                setVersions(data)  // [keys: url, template, modeCode, languageCode, modeLiteral, languageLiteral]

            } catch (error) {
                setError(error.message)

            } finally {
                setLoading(false)

            }
        }
        fetchVersions()

    }, [])

    if (loading) {
        return (
            <div className="w-full flex justify-center mt-10">
                <LoadingIcon />
            </div>
        )
    }

    if (error) {
        return <StateIndicator
            svg={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                </svg>
            }
            headline="Error occurred"
            abstract="Please try again or contact the developer."
        />
    }

    return (
        <div className="mx-auto mt-10 max-w-4xl px-5 mb-96">
            <h2 className="text-sm font-medium text-gray-500">Versions available</h2>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
                {versions.map((version) => (
                    <li key={nanoid()} className="group select-none bg-white hover:bg-gray-100 cursor-pointer col-span-1 flex rounded-md shadow-sm">
                        <div
                            className='flex w-16 shrink-0 items-center justify-center rounded-l-md border-t border-l border-b text-sm font-medium text-white'
                        >
                            {getCountryFlag(version.languageCode, "h-9 w-auto")}
                        </div>
                        <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200">
                            <div className="flex-1 truncate px-4 py-2 text-sm">
                                <Link to={`${version.modeCode}/${version.languageCode}`} className="font-medium text-gray-900 hover:text-gray-600">
                                    {version.languageLiteral}
                                </Link>
                                <p className="text-gray-500">{version.modeLiteral}</p>
                            </div>
                            {/*<div className="shrink-0 pr-2">*/}
                            {/*    <button*/}
                            {/*        type="button"*/}
                            {/*        className="inline-flex size-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*/}
                            {/*    >*/}
                            {/*        <span className="sr-only">Open options</span>*/}
                            {/*        <EllipsisVerticalIcon aria-hidden="true" className="size-5" />*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
