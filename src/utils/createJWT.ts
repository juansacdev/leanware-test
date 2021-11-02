import jwt from 'jsonwebtoken'
import config from '../config/index'
import { User } from '../entities/User'

const createToken = (user: User): string => {
	const token = jwt.sign(
		{
			sub: user.id,
			email: user.email,
			role: user.role.type,
		},
		config.jwtSecret,
		{
			expiresIn: Number(config.jwtTime),
		},
	)
	return token
}

export default createToken
