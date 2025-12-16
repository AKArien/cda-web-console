import type { sites } from "../database-types"
import { auth_headers } from "../headers"

export async function get_available_sites(): Promise<sites[]> {
	const headers = auth_headers()

	const res = await fetch("https://localhost:3000/sites", {
		method: "GET",
		headers: headers,
	})

	if (res.ok) {
		const resp = (await res.json()) as sites[]
		return resp
	}

	throw new Error()
}
