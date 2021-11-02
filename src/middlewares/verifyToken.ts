import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import { Payload } from '../typings/interfaces'

async function verifyToken(
	req: Request,
	_res: Response,
	next: NextFunction,
): Promise<void> {
	const bearerToken = req.headers.authorization
	if (!bearerToken) return next(boom.unauthorized('Token required'))

	const [bearer, token] = bearerToken.split(' ')
	if (bearer !== 'Bearer' || !token)
		return next(boom.unauthorized('Invalid token format'))

	try {
		const decoded = jwt.verify(token, config.jwtSecret) as Payload
		if (decoded) {
			req.user = decoded
			return next()
		}
		return next(boom.badData('Bad Data'))
	} catch (error) {
		return next(boom.forbidden())
	}
}

export default verifyToken
