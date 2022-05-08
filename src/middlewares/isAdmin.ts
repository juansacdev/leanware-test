import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

function isAdmin(req: Request, _res: Response, next: NextFunction): void {
	const {
		user: { role },
	} = req

	try {
		if (role !== 'admin') next(boom.forbidden())
		next()
	} catch (error) {
		next(boom.badData())
	}
}

// const authRoles = (roles: Array<string>) =>
// 	(req: Request, res: Response, next: NextFunction): void => {
// 		const {
// 			user: { role },
// 		} = req

// 		try {
// 			if (!roles.includes(role)) next(boom.forbidden())
// 			next()
// 		} catch (error) {
// 			next(boom.badData())
// 		}
// 	}

export default isAdmin
