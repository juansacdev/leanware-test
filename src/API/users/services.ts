import boom from '@hapi/boom'
import { ID, UpdateUser } from 'src/typings/interfaces'
import { User } from '../../entities/User'

export class UserServices {
	static async getAll(): Promise<User[]> {
		const users = await User.find({
			relations: ['role', 'projects', 'reports'],
			where: { isActive: true },
		})
		return users
	}

	static async getOneById(id: ID): Promise<User> {
		const userFound = await User.findOne({
			relations: ['role', 'projects', 'reports'],
			where: { id, isActive: true },
		})

		if (!userFound) throw boom.notFound("User doesn't exist")
		return userFound
	}

	static async updateOne(id: ID, data: UpdateUser): Promise<User> {
		const userFound = await this.getOneById(id)
		if (!userFound) throw boom.notFound("User doesn't exist")

		const userUpdated = User.merge(userFound, data)
		return User.save(userUpdated)
	}

	static async deleteOne(id: ID): Promise<boolean> {
		const userFound = await this.getOneById(id)
		if (!userFound) throw boom.notFound("User doesn't exist")

		userFound.isActive = false
		const softDel = await User.save(userFound)

		return !!softDel
	}
}
