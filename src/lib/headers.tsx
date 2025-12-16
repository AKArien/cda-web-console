
export function anon_headers(): Headers{
    const headers = new Headers()
    headers.set("Content-Type", "application/json")
    headers.set("Access-Control-Allow-Origin", "*")
    headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    return headers
}

export function auth_headers(): Headers{
    const headers = new Headers()
    headers.set("Content-Type", "application/json")
    headers.set("Access-Control-Allow-Origin", "*")
    headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    return headers
}
