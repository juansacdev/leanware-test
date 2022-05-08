import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import config from '../config'

const errorStack = (err, stack) => {
	if (config.isDev) {
		return { ...err, stack }
	}
	return err
}

export const logErrors = (
	err,
	_req: Request,
	_res: Response,
	next: NextFunction,
) => {
	if (config.isDev) console.log(err)
	else console.log(err.message)
	next(err)
}

export const wrapErrors = (
	err,
	_req: Request,
	_res: Response,
	next: NextFunction,
) => {
	if (!err.isBoom) next(boom.badImplementation(err))
	next(err)
}

export const errorHandler = (
	err,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const {
		output: { statusCode, payload },
	} = err
	res.status(statusCode)
	res.json(errorStack(payload, err.stack))
}
