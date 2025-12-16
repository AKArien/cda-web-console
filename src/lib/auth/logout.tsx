import { auth_headers } from "../headers"

export async function logout(): Promise<Response> {
	const headers = auth_headers()

	const res = await fetch("https://localhost:3000/rpc/logout", {
		method: "GET",
		headers: headers,
	})

	if (res.ok) {
		document.cookie = "session=; expires=0, path=/auth"
	}

	return res
}
