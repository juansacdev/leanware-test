import { config } from 'dotenv'
config()

export default {
	isDev: process.env.NODE_ENV !== 'production',
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET ?? '',
	jwtTime: process.env.JWT_TIME,
}
