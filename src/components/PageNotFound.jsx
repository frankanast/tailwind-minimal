import {Link} from "react-router-dom";
import CustomerLogoImg from "./abstract/CustomerLogoImg.jsx";

export default function PageNotFound() {
    return (
        <>
            <div className="grid min-h-full grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white lg:grid-cols-[max(50%,36rem)_1fr]">
                <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
                    <Link to="/">
                        <span className="sr-only">Borgo San Felice Resort</span>
                        <CustomerLogoImg className="h-10 w-auto sm:h-12"/>
                    </Link>
                </header>
                <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
                    <div className="max-w-lg">
                        <p className="text-base/8 font-semibold text-indigo-600">404</p>
                        <h1 className="mt-4 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                            Page not found
                        </h1>
                        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                            Sorry, we couldn’t find the page you’re looking for.
                        </p>
                        <div className="mt-10">
                            <Link to="/" className="text-sm/7 font-semibold text-indigo-600">
                                <span aria-hidden="true">&larr;</span> Back to home
                            </Link>
                        </div>
                    </div>
                </main>
                <footer className="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
                    <div className="border-t border-gray-100 bg-gray-50 py-10">
                        <nav className="mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm/7 text-gray-600 lg:px-8">
                            <Link to="/support">Contact support</Link>
                            <svg viewBox="0 0 2 2" aria-hidden="true" className="size-0.5 fill-gray-300">
                                <circle r={1} cx={1} cy={1} />
                            </svg>
                            <Link to="/support/status">Status</Link>
                        </nav>
                    </div>
                </footer>
                <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
                    <img
                        alt=""
                        src="https://programmino-be.onrender.com/download_pic/164d2785-c20b-406a-825f-63f0689ee7f7.jpg"
                        className="absolute inset-0 h-screen object-cover"
                    />
                </div>
            </div>
        </>
    )
}
