// public interfaces to records and types from database

// point and perimeter type to interface with postgres geographic types
export interface point {
	readonly x: number
	readonly y: number
}

export interface path {
	points: point[]
	closed: boolean
}

// types mimicking tables
export interface access {
	name: number
	expires: Date
	max_session_time: number
	force_change_pass: boolean
}

export interface sites {
	name: string
	info: string
	perimeter: path
}
