interface RetData {
    token: string
    session_time: number
}

export async function login(access: string, pass: string, req_dur = 3600): Promise<Response>{
    const headers: Headers = new Headers()
    headers.set("Content-Type", "application/json")
    headers.set("Access-Control-Allow-Origin", "*")
    headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    const res = await fetch(
        "http://localhost:3000/rpc/login",
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify(
                {
                    access: access,
                    pass: pass,
                    requested_session_time: req_dur
                }
            )
        }
    )

    if (res.ok){
        console.log("setting cookie")
        const resp = await res.json() as RetData
        const exp = (new Date(Date.now() + (resp.session_time * 60 * 1000)))

        document.cookie =
            "session="
            + resp.token
            + "; expires="
            + exp.toUTCString()
            + "; path=/"
    }

    return res
}