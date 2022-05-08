import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

async function isClient(
	req: Request,
	_res: Response,
	next: NextFunction,
): Promise<void> {
	const { user } = req

	try {
		if (user?.role !== 'client') next(boom.forbidden())
		next()
	} catch (error) {
		next(boom.badData())
	}
}

export default isClient
