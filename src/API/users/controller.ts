import { NextFunction, Request, Response } from 'express'
import { UserServices } from './services'

export class UserController {
	static async findAllUsers(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const users = await UserServices.getAll()
			return res.status(200).json({ users })
		} catch (error) {
			next(error)
		}
	}

	static async findOneUserById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params
			const user = await UserServices.getOneById(id)

			return res.status(200).json({ user })
		} catch (error) {
			next(error)
		}
	}

	static async findMe(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { user } = req
			const currentUser = await UserServices.getOneById(user.sub)
			return res.status(200).json(currentUser)
		} catch (error) {
			next(error)
		}
	}

	static async updateOneUserById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				body: data,
				params: { id },
			} = req
			const userUpdated = await UserServices.updateOne(id, data)
			return res.status(201).json(userUpdated)
		} catch (error) {
			next(error)
		}
	}

	static async updateMe(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { body: data, user } = req
			const userUpdated = await UserServices.updateOne(user!.sub, data)

			return res.status(201).json(userUpdated)
		} catch (error) {
			next(error)
		}
	}

	static async deleteOneUserById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params
			const isUserDeleted = await UserServices.deleteOne(id)

			return res.status(200).json(isUserDeleted)
		} catch (error) {
			next(error)
		}
	}

	static async deleteMe(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { user } = req
			const isUserDeleted = await UserServices.deleteOne(user!.sub)
			return res.status(200).json(isUserDeleted)
		} catch (error) {
			next(error)
		}
	}
}
