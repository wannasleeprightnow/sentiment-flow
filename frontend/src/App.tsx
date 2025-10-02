import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Main } from "./pages/Main";

export function App() {
	return (
		<Routes>
			<Route element={<Auth />} path="/auth" />
			<Route element={<MainLayout />} path="/">
				<Route element={<Main />} path="/" />
				<Route element={<Dashboard />} path="/:categoryId" />
			</Route>
		</Routes>
	);
}
