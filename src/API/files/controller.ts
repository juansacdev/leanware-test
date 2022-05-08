import { NextFunction, Request, Response } from 'express'
import fs from 'fs/promises'
import { parse as json2csv } from 'json2csv'
import { DateRange } from 'src/typings/interfaces'
import { ProjectServices } from '../project/services'
import { ReportServices } from '../report/services'
import { FileServices } from './services'

export class FileController {
	static async upload(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { file, user } = req

			const reports = await Promise.all(
				file!.buffer
					.toLocaleString()
					.replace(/\n|\s/gi, ',')
					.split(',')
					.slice(3, -1)
					?.map((item, index, arr) => {
						if (index % 3 === 0) {
							return {
								percentage: Number(item),
								projectIds: [arr[index + 1]],
								date: new Date(arr[index + 2]),
							}
						}
					})
					.filter(i => i !== undefined)
					.map(
						async report =>
							report &&
							(await ProjectServices.assign(user.sub, report.projectIds),
							await ReportServices.create(report, user.sub)),
					),
			)

			return res.status(200).json({ reports })
		} catch (error) {
			next(error)
		}
	}

	static async download(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const dateRange: DateRange = req.body
			const { user } = req

			const reports = await FileServices.getAllByDateRange(dateRange, user.sub)

			await fs.writeFile(
				'./src/tmp/resports.csv',
				json2csv(reports, { delimiter: '|' }),
				{ encoding: 'utf-8' },
			)

			return res
				.status(200)
				.download('./src/tmp/resports.csv', 'reports.csv', () =>
					fs.unlink('./src/tmp/resports.csv'),
				)
		} catch (error) {
			next(error)
		}
	}
}
