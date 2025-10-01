import { HeroUIProvider } from "@heroui/system";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import "./styles/index.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<HeroUIProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</HeroUIProvider>
	</QueryClientProvider>
);
