import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

async function isAdmin(
	req: Request,
	_res: Response,
	next: NextFunction,
): Promise<void> {
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

export default isAdmin
