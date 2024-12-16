import AddSolutionIcon from "../../assets/icons/AddSolutionIcon.jsx";

export default function AddSolutionBox() {
    return (
        <button
            type="button"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-7 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            <AddSolutionIcon className="mx-auto size-12 text-gray-400" />
            <span className="mt-2 block text-sm font-semibold text-gray-900">Add a solution</span>
        </button>
    )
}
