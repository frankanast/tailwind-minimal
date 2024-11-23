import 'react'
import LoginView from "./components/LoginView.jsx";
import HomeScreen from "./components/HomeScreen.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();

    return(
        <QueryClientProvider client={queryClient}>
            <HomeScreen />
        </QueryClientProvider>
    )
}

export default App
