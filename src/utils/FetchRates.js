'use client'
import { useQuery } from "@tanstack/react-query"
import {useQuoteContext} from "../components/quotes/QuoteContext.jsx"

const BASE_URL = "https://programmino-be.onrender.com/";

export default function FetchRates() {
    const { checkInDate, checkOutDate, occupancy } = useQuoteContext();

    const {
        data: rates,
        // isError,
        // isPending,
    } = useQuery({
        queryKey: ["avail", { checkInDate, checkOutDate, occupancy }],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/avail/byroom/occasc/?check_in=${checkInDate}&check_out=${checkOutDate}&rooms=${occupancy}`);
            if (!response.ok) {
                alert("Unable to fetch rates now due to network issues, please try again later.");
            }
            return (await response.json());
        },
    });

    // Do cool things with the JSX

    // return (
    //     <div className="tutorial">
    //         <h1 className="mb-4 text-2xl">Data Fething in React</h1>
    //         <button onClick={() => setPage(page - 1)}>Decrease Page ({page})</button>
    //         <button onClick={() => setPage(page + 1)}>Increase Page ({page})</button>
    //         {isPending && <div>Loading...</div>}
    //         {!isPending && (
    //             <ul>
    //                 {posts?.map((post) => {
    //                     return <li key={post.id}>{post.title}</li>;
    //                 })}
    //             </ul>
    //         )}
    //     </div>
    // );
    return rates;
}