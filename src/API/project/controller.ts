import { NextFunction, Request, Response } from 'express'
import { ProjectServices } from './services'

export class ProjectController {
	static async findAllProds(
		_req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const projects = await ProjectServices.getAll()
			return res.status(200).json({ projects })
		} catch (error) {
			next(error)
		}
	}

	static async findOneProdById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params
			const project = await ProjectServices.getOneById(id)

			return res.status(200).json({ project })
		} catch (error) {
			next(error)
		}
	}

	static async createOneProd(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { body: data } = req
			const prodCreated = await ProjectServices.create(data)
			return res.status(201).json({ prodCreated })
		} catch (error) {
			next(error)
		}
	}

	static async updateOneProdById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				body: data,
				params: { id },
			} = req
			const prodUpdated = await ProjectServices.updateOne(id, data)

			return res.status(201).json({ prodUpdated })
		} catch (error) {
			next(error)
		}
	}

	static async deleteOneProdById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params
			const isProdDeleted = await ProjectServices.deleteOne(id)
			return res.status(200).json(isProdDeleted)
		} catch (error) {
			next(error)
		}
	}
}
