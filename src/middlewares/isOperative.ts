import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

async function isOperative(
	req: Request,
	_res: Response,
	next: NextFunction,
): Promise<void> {
	const {
		user: { role },
	} = req

	try {
		if (role !== 'operative') next(boom.forbidden())
		next()
	} catch (error) {
		next(boom.badData())
	}
}

export default isOperative
