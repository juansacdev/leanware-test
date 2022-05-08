import { NextFunction, Request, Response } from 'express'
import { ReportServices } from './services'

export class ReportController {
	static async findAllReports(
		_req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const reports = await ReportServices.getAll()
			return res.status(200).json({ reports })
		} catch (error) {
			next(error)
		}
	}

	static async fidnAllByMe(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				user: { sub },
			} = req
			const reports = await ReportServices.getAllMe(sub)
			return res.status(200).json({ reports })
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
			const report = await ReportServices.getOneById(id)

			return res.status(200).json({ report })
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
			const {
				body: data,
				user: { sub },
			} = req
			const reportCreated = await ReportServices.create(data, sub)
			return res.status(201).json({ reportCreated })
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
			const reportUpdated = await ReportServices.updateOne(id, data)

			return res.status(201).json({ reportUpdated })
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
			const isReportDeleted = await ReportServices.deleteOne(id)
			return res.status(200).json(isReportDeleted)
		} catch (error) {
			next(error)
		}
	}
}
