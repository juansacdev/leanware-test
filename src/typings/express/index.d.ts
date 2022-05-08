declare module Express {
	export interface Request {
		user: {
			role: string
			sub: string | number
			email: string
		}
	}
}
