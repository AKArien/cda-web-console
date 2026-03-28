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
	id: number
	name: number
	expires: Date
	max_session_time: number
	force_change_pass: boolean
}

export interface sites {
	id: number
	name: string
	info: string
	perimeter: path
}

export interface gateways {
	id: number
	site: number
	name: string
	info: string
	location: point
}

export interface watchers {
	id: number
	gateway: number
	name: string
	info: string
	location: point
}

export interface reports {
	moment: Date
	watcher: number
	report: number
}