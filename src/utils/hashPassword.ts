import bcryptjs from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
	const salt = await bcryptjs.genSalt(10)
	return bcryptjs.hash(password, salt)
}

export const isValidPassword = (
	rawPassword: string,
	hashPassword: string,
): Promise<boolean> => bcryptjs.compare(rawPassword, hashPassword)
