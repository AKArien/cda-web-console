import type { access } from "../database-types"
import { auth_headers } from "../headers"

export async function session_access(): Promise<access | null> {
	const headers = auth_headers()

	const res = await fetch("https://localhost:3000/rpc/get_access_data", {
		method: "GET",
		headers: headers,
	})

	if (res.ok) {
		const resp = (await res.json()) as access
		return resp
	}

	return null
}
