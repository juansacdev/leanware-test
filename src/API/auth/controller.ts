import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { LoginUser, NewUser } from '../../typings/interfaces'
import { AuthServices } from './services'

export class AuthController {
	static async signUp(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const userData = req.body as NewUser

			if (
				typeof userData.firtsName === 'undefined' ||
				typeof userData.firtsName === 'undefined' ||
				!userData.email ||
				!userData.password
			)
				throw boom.badRequest('Send all obligatory fields please')

			const {
				query: { type },
			} = req

			const userCreated = await AuthServices.signUp(
				userData,
				(type as string).toLowerCase(),
			)

			return res.status(201).json({ userCreated })
		} catch (error) {
			console.log(error)
			next(error)
		}
	}

	static async signIn(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const userData = req.body as LoginUser
			const token = await AuthServices.signIn(userData)

			return res.status(200).json({ token })
		} catch (error) {
			next(error)
		}
	}
}
