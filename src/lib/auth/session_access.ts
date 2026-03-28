import type { access } from "../database-types"
import { auth_headers } from "../headers"

export async function session_access(): Promise<access | null> {
	let headers: Headers
	try {
		headers = auth_headers()
	}
	catch {
		return null
	}

	const res = await fetch(import.meta.env.VITE_POSTGREST_URL + "/rpc/get_access_data", {
		method: "GET",
		headers: headers,
	})

	if (res.ok) {
		const resp = (await res.json()) as access
		return resp
	}

	return null
}
