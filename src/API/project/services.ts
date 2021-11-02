import boom from '@hapi/boom'
import { Project } from '../../entities/Project'
import { ID, IProject } from '../../typings/interfaces'
import { UserServices } from '../users/services'

export class ProjectServices {
	static async getAll(): Promise<Project[]> {
		const projects = await Project.find({
			relations: ['user'],
			where: { isActive: true },
		})
		return projects
	}

	static async getOneById(id: ID): Promise<Project> {
		const project = await Project.findOne({
			where: { id, isActive: true },
			relations: ['user'],
		})

		if (!project) throw boom.notFound("Project doesn't exist")
		return project
	}

	static async assign(userId: ID, projectIds: ID[]): Promise<Project[]> {
		const user = await UserServices.getOneById(userId)
		const projects = await Project.findByIds(projectIds)

		const ProjectAssigned = await Promise.all(
			projects.map(project => {
				project.user = user
				return Project.save(project)
			}),
		)

		return ProjectAssigned
	}

	static create(data: IProject): Promise<Project> {
		const newProject = Project.create(data)
		return Project.save(newProject)
	}

	static async updateOne(id: ID, data: IProject): Promise<Project> {
		const project = await this.getOneById(id)
		if (!project) throw boom.notFound("Project doesn't exist")

		const prodUpdated = Project.merge(project, data)
		return Project.save(prodUpdated)
	}

	static async deleteOne(id: ID): Promise<boolean> {
		const project = await this.getOneById(id)
		if (!project) throw boom.notFound("Project doesn't exist")

		project.isActive = false
		const softDel = await Project.save(project)

		return !!softDel
	}
}
