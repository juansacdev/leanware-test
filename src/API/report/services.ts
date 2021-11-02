import boom from '@hapi/boom'
import { Project } from '../../entities/Project'
import { Report } from '../../entities/Report'
import { ID, IReport, UpdateReport } from '../../typings/interfaces'
import { UserServices } from '../users/services'

export class ReportServices {
	static async getAll(): Promise<Report[]> {
		const reports = await Report.find({
			relations: ['user'],
			where: { user: { isActive: true } },
		})
		return reports
	}

	static async getAllMe(userId: ID): Promise<Report[]> {
		const reports = await Report.find({
			relations: ['user'],
			where: { user: { id: userId, isActive: true } },
		})
		return reports
	}

	static async getOneById(id: ID): Promise<Report> {
		const report = await Report.findOne({
			where: { id, user: { isActive: true } },
			relations: ['user'],
		})

		if (!report) throw boom.notFound("Report doesn't exist")
		return report
	}

	static async create(
		{ percentage, projectIds, date }: IReport,
		userId: ID,
	): Promise<Report> {
		const projects = await Project.findByIds(projectIds)
		const user = await UserServices.getOneById(userId)
		const report = Report.create({
			date,
			percentage,
			projects,
			user,
		})

		return Report.save(report)
	}

	static async updateOne(reportId: ID, data: UpdateReport): Promise<Report> {
		const report = await this.getOneById(reportId)
		if (!report) throw boom.notFound("Report doesn't exist")

		const reportUpdated = Report.merge(report, data)
		return Report.save(reportUpdated)
	}

	static async deleteOne(id: ID): Promise<boolean> {
		const report = await this.getOneById(id)
		if (!report) throw boom.notFound("Report doesn't exist")

		const hardDel = await Report.delete(id)

		return !!hardDel
	}
}
