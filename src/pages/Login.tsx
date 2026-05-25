import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { login } from "../lib/auth/login"
import { session_access } from "../lib/auth/session_access"

const SECONDS_PER_HOUR = 60 * 60
const HOURS_PER_DAY = 24
const DEFAULT_SESSION_TIME = 1

export default function Login(){
	const [error, setError] = useState<string | null>(null)
	const [durationUnit, setDurationUnit] = useState<"hours" | "days">("hours")

	const navigate = useNavigate()

	async function submitForm(form: HTMLFormElement) {
		const formData = new FormData(form)
		const org = formData.get("organisation") as string
		const access = formData.get("access") as string
		const pass = formData.get("pass") as string
		const reqDurRaw = formData.get("req_dur")
		const unit = formData.get("req_dur_unit") as string // "hours" or "days"
		const reqDurValue =
			typeof reqDurRaw === "string" && reqDurRaw.trim() !== ""
				? Number(reqDurRaw)
				: DEFAULT_SESSION_TIME
		let reqDurHours = reqDurValue
		if (unit === "days") reqDurHours *= HOURS_PER_DAY
		const reqDur = reqDurHours * SECONDS_PER_HOUR

		try {
			await login(org, access, pass, reqDur)
			void navigate("/")
		} catch (e) {
			setError(e as string)
		}
	}

	function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault()
		void submitForm(e.currentTarget)
	}

	useEffect(() => {
		void (async () => {
			const access = await session_access()
			if (access) {
				void navigate("/")
			}
		})()
	}, [navigate])

	return (
		<div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
			<form
				method="post"
				onSubmit={handleSubmit}
				className="w-full max-w-[420px] border border-base-300 bg-base-100"
			>
				<div className="px-6 py-8 border-b border-base-300 text-center">
					<p className="text-xl font-bold tracking-wide text-primary">CDA</p>
					<p className="mt-2 text-xs font-bold tracking-[0.2em] text-primary/70 uppercase">
						Data Visualisation Console
					</p>
				</div>

				<div className="px-6 py-6 space-y-5">
					{error ?
						<div className="alert alert-error py-2 text-xs">
							<span>{error}</span>
						</div>
					:	null}

					<div className="space-y-2">
						<label
							htmlFor="organisation"
							className="text-xs font-bold tracking-wide uppercase text-base-content/80"
						>
							Organisation
						</label>
						<input
							id="organisation"
							name="organisation"
							type="text"
							placeholder="cda-foundation"
							required
							className="input input-bordered w-full rounded-none"
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="access"
							className="text-xs font-bold tracking-wide uppercase text-base-content/80"
						>
							Access name
						</label>
						<input
							id="access"
							name="access"
							type="text"
							placeholder="ID_AUTH_000000"
							required
							className="input input-bordered w-full rounded-none"
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="pass"
							className="text-xs font-bold tracking-wide uppercase text-base-content/80"
						>
							Passphrase
						</label>
						<input
							id="pass"
							name="pass"
							type="password"
							placeholder="••••••••••••"
							required
							className="input input-bordered w-full rounded-none"
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="req_dur"
							className="text-xs font-bold tracking-wide uppercase text-base-content/80"
						>
							Session Duration ({durationUnit === "hours" ? "Hours" : "Days"})
						</label>
						<div className="flex gap-2">
							<input
								id="req_dur"
								name="req_dur"
								type="number"
								min={1}
								defaultValue={DEFAULT_SESSION_TIME}
								placeholder={durationUnit === "hours" ? "Hours" : "Days"}
								className="input input-bordered w-full rounded-none"
							/>
							<input
								type="hidden"
								name="req_dur_unit"
								value={durationUnit}
							/>
							<button
								type="button"
								className="btn btn-outline btn-sm rounded-none"
								onClick={() =>
									setDurationUnit(durationUnit === "hours" ? "days" : "hours")
								}
								tabIndex={-1}
							>
								{durationUnit === "hours" ? "To Days" : "To Hours"}
							</button>
						</div>
					</div>

					<div className="flex justify-center">
						<button
							type="submit"
							name="submit"
							className="btn btn-primary rounded-none mt-2 uppercase tracking-[0.15em] font-bold"
						>
							Log in
						</button>
					</div>
				</div>

				<div className="px-6 py-5 border-t border-base-300 text-center space-y-2 text-[10px] text-base-content/50">
					<div className="flex justify-between uppercase tracking-wide">
						<span>CDA v1.0.0</span>
					</div>
					<p>
						Crowd Data Aggregation Internal Protocol. Unauthorized access is strictly
						prohibited and monitored.
					</p>
				</div>
			</form>
		</div>
	)
}
