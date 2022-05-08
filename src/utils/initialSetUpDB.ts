import { Connection, getConnection } from 'typeorm'
import { Project } from '../entities/Project'
import { Role } from '../entities/Role'
import { projectsSeed } from '../seed/projectsSeed'
import { roleSeed } from '../seed/roleSeed'

export async function setInitalValues(connection: Connection): Promise<void> {
	await connection.runMigrations()
	const [{ count: countRoles }] = await getConnection()
		.createQueryBuilder()
		.select('COUNT(*)')
		.from(Role, 'roles')
		.execute()

	if (countRoles === '0') {
		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(Role)
			.values(roleSeed)
			.execute()
	}

	const [{ count: countProjects }] = await getConnection()
		.createQueryBuilder()
		.select('COUNT(*)')
		.from(Project, 'projects')
		.execute()

	if (countProjects === '0') {
		await getConnection()
			.createQueryBuilder()
			.insert()
			.into(Project)
			.values(projectsSeed)
			.execute()
	}
}
