import { access } from "../lib/database-types"

export default function Access(access:access) {

	return (
        <>
            <h2>About this access</h2>
            <h3 className="disclaimer">Please your organisation might deny you certain information or actions.</h3>
            <h4>Logged in as <span className="name">{access.name}</span></h4>
            <p>
                Your access is valid until the <span className="expires">{access.expires.toString()}</span>.
                
            </p>
            
        </>
    )
}