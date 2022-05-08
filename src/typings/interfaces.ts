export interface LoginUser {
	email: string
	password: string
}

export interface NewUser extends LoginUser {
	firtsName: string
	lastName: string
}

export interface UpdateUser {
	email?: string
	password?: string
	firtsName?: string
	lastName?: string
}

export interface Payload {
	sub: number | string
	email: string
	role: string
}

export interface IProject {
	name: string
	startDate: Date
	endDate?: Date
}

export type ID = number | string

export interface IReport {
	percentage: number
	date: Date
	projectIds: Array<ID>
}

export interface UpdateReport {
	percentage: number
}

export interface DateRange {
	startDate: Date
	endDate: Date
}
