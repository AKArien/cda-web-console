import { auth_headers } from "../headers"

export async function logout(): Promise<Response> {
	let headers: Headers
	try {
		headers = auth_headers()
	}
	catch {
		throw new Error
	}

	const res = await fetch(import.meta.env.VITE_DEV_WEBSITE_URL + "/rpc/logout", {
		method: "GET",
		headers: headers,
	})

	if (res.ok) {
		document.cookie = "session=; expires=0, path=/auth"
	}

	return res
}
