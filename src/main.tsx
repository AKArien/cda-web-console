import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { BrowserRouter } from "react-router"
import Router from "./Router.tsx"

import Base from "./layouts/Base.tsx"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Base>
				<Router />
			</Base>
		</BrowserRouter>
	</StrictMode>,
)
