import { access, gateways, sites, watchers, reports } from "./database-types"
import { auth_headers } from "./headers"

interface api_types {
    access: access
    sites: sites
    gateways: gateways
    watchers: watchers
    reports_watchers: reports
    reports_gateways: reports
    reports_sites: reports
}

export async function get<type extends keyof api_types>(endpoint: type, filters: string): Promise<api_types[type][]>{
	let headers: Headers
	try {
		headers = auth_headers()
	}
	catch {
		throw new Error()
	}

    const res = await fetch(
        `${import.meta.env.VITE_POSTGREST_URL}/${endpoint}?${filters}`,
        {
            method: "GET",
            headers,
        }
    );

    if (res.ok) {
    return (await res.json()) as api_types[type][];
    }

    throw new Error("Request failed");
}