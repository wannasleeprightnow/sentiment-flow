import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { HeroUIProvider } from "@heroui/system";

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
	<main className="dark text-foreground bg-background w-full h-screen">
    	<App />
	</main>
  </HeroUIProvider>
);
