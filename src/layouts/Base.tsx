interface BaseProps {
	children: React.ReactNode
}

export default function Base(props: BaseProps) {
	return (
		<>
			basic bitch
			{document.cookie ? document.cookie : "nothing"}
			{props.children}
		</>
	)
}
