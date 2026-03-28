import { access, gateways, sites, watchers, reports } from "./database-types"
import { auth_headers } from "./headers"

interface endpoints {
    access: access
    sites: sites
    gateways: gateways
    watchers: watchers
    reports_watchers: reports
    reports_gateways: reports
    reports_sites: reports
}

export async function get<endpoint extends keyof endpoints>(
    endpoint: endpoint, filters: string
): Promise<endpoints[endpoint][]>{
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
        return (await res.json()) as endpoints[endpoint][];
    }

    throw new Error("Request failed");
}