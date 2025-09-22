import { Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Main } from "./pages/Main";

export function App() {
	return (
		<Routes>
			<Route element={<Auth />} path="/auth" />
			<Route element={<Main />} path="/" />
		</Routes>
	);
}
