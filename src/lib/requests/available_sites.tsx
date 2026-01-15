import type { sites } from "../database-types"
import { auth_headers } from "../headers"

export async function get_available_sites(): Promise<sites[]> {
	let headers: Headers
	try {
		headers = auth_headers()
	}
	catch {
		throw new Error()
	}

	const res = await fetch(import.meta.env.VITE_POSTRGREST_URL + "/sites", {
		method: "GET",
		headers: headers,
	})

	if (res.ok) {
		const resp = (await res.json()) as sites[]
		return resp
	}

	throw new Error()
}
