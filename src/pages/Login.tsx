import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { login } from "../lib/auth/login"
import { session_access } from "../lib/auth/session_access"

export default function Login() {
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()
	const passInputRef = useRef<HTMLInputElement>(null)

	async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const access = formData.get("access") as string
		const pass = formData.get("pass") as string
		try {
			await login(access, pass)
			void navigate("/")
		} catch (e) {
			setError(e as string)
		}
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
				onSubmit={(e) => {
					void handleSubmit(e)
				}}
				className="w-full max-w-[320px] border border-base-300 bg-base-100"
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
							htmlFor="access"
							className="text-xs font-bold tracking-wide uppercase text-base-content/80"
						>
							Terminal Identifier
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
						<div className="flex items-center justify-between gap-2">
							<label
								htmlFor="pass"
								className="text-xs font-bold tracking-wide uppercase text-base-content/80"
							>
								Security Credentials
							</label>
							<button
								type="button"
								onClick={() => {
									if (passInputRef.current) {
										passInputRef.current.value = ""
										passInputRef.current.focus()
									}
								}}
								className="btn btn-ghost btn-xs rounded-none px-0 uppercase tracking-wide text-primary"
							>
								Reset
							</button>
						</div>
						<input
							id="pass"
							name="pass"
							type="password"
							placeholder="••••••••••••"
							required
							ref={passInputRef}
							className="input input-bordered w-full rounded-none"
						/>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="req_dur"
							className="text-xs font-bold tracking-wide uppercase text-base-content/80"
						>
							Session Duration (Hours)
						</label>
						<input
							id="req_dur"
							name="req_dur"
							type="number"
							min={1}
							defaultValue={1}
							className="input input-bordered w-full rounded-none"
						/>
					</div>

					<label className="label cursor-pointer justify-start gap-2 px-0">
						<input
							type="checkbox"
							name="persistent_session"
							value="true"
							className="checkbox checkbox-xs rounded-none"
						/>
						<span className="text-sm text-base-content/80">Persistent Session</span>
					</label>

					<button
						type="submit"
						name="submit"
						className="btn btn-primary w-full rounded-none mt-2 uppercase tracking-[0.15em] font-bold"
					>
						Authorize Access
					</button>
				</div>

				<div className="px-6 py-5 border-t border-base-300 text-center space-y-2 text-[10px] text-base-content/50">
					<div className="flex justify-between uppercase tracking-wide">
						<span>Secure_V3_Encryption</span>
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
