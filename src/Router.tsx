import { Route, Routes } from "react-router"

import Home from "./pages/Home"
import Login from "./pages/Login"
import _404 from "./pages/errors/404"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { session_access } from "./lib/auth/session_access"

export default function Router() {
	// if not logged in, always go to the login page
	const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const checkSession = async () => {
			const access = await session_access();
			setIsAuthorized(access !== null);
		};
		void checkSession();
	}, []);

	useEffect(() => {
		if (isAuthorized === false) {
			void navigate("/login", { replace: true });
		}
	}, [isAuthorized, navigate]);

	if (isAuthorized === null) {
		return <div>Loading…</div>;
	}

	return (
		<>
			<Routes>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="*"
					element={<_404 />}
				/>
			</Routes>
		</>
	)
}
