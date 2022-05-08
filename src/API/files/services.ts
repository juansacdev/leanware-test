import boom from '@hapi/boom'
import { Between } from 'typeorm'
import { Report } from '../../entities/Report'
import { DateRange, ID } from '../../typings/interfaces'

export class FileServices {
	static async getAllByDateRange(
		{ endDate, startDate }: DateRange,
		userId: ID,
	): Promise<Report[]> {
		const projects = await Report.find({
			relations: ['projects'],
			select: ['id', 'percentage', 'date'],
			where: {
				date: Between(startDate, endDate),
				user: { isActive: true, id: userId },
			},
		})

		if (!projects.length)
			throw boom.notFound('Not projects between this date range.')

		return projects
	}
}
