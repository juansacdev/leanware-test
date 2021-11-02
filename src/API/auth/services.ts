import boom from '@hapi/boom'
import { Role, RoleType } from '../../entities/Role'
import { User } from '../../entities/User'
import createToken from '../../utils/createJWT'
import { isValidPassword } from '../../utils/hashPassword'
import { LoginUser, NewUser } from '../../typings/interfaces'

export class AuthServices {
	static async findByEmail(email: string): Promise<User | undefined> {
		const user = await User.findOne(
			{ email, isActive: true },
			{ relations: ['role', 'projects', 'reports'] },
		)
		return user
	}

	static async signUp(userData: NewUser, role: string): Promise<User> {
		const isUserExist = await AuthServices.findByEmail(userData.email)
		if (isUserExist) throw boom.badRequest('User already exist')

		const newUser = User.create(userData)

		const isRoleAvailable = (Object.values(RoleType) as string[]).includes(role)
		if (!isRoleAvailable) throw boom.badRequest("Role doesn't exist")

		const roleFound = await this.getRole(role)

		if (roleFound) newUser.role = roleFound
		const userCreated = await User.save(newUser)

		if (!userCreated) throw boom.badData('Error creating User')
		return userCreated
	}

	static async isPassMatch(
		rawPass: string,
		hashPass: string,
	): Promise<boolean> {
		return await isValidPassword(rawPass, hashPass)
	}

	static async getRole(role: string): Promise<Role | undefined> {
		const roleFound = await Role.findOne({ where: { type: role } })
		return !roleFound ? undefined : roleFound
	}

	static async signIn({ email, password }: LoginUser): Promise<string> {
		const userFound = await AuthServices.findByEmail(email)
		if (!userFound) throw boom.badRequest('Credential are incorrect')

		const isMatch = await userFound.comparePasswords(
			password,
			userFound.password,
		)
		if (!isMatch) throw boom.badRequest('Credential are incorrect')

		return createToken(userFound)
	}
}
