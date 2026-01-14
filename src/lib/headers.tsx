export function anon_headers(): Headers {
	const headers = new Headers()
	headers.set("Content-Type", "application/json")
	headers.set("Access-Control-Allow-Origin", "*")
	headers.set(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	)
	return headers
}

// all calls to auth_headers, and thus any authenticated api call, must catch a potential error on no session
export function auth_headers(): Headers {
	const sessionCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("session="));

	if (!sessionCookie) {
		throw new Error
	}

	const headers = anon_headers()
	headers.set(
		"Authorization",
		"Bearer " +
			(document.cookie
				.split("; ")
				.find((row) => row.startsWith("session="))
				?.split("=")[1] ?? ""),
	)
	return headers
}
