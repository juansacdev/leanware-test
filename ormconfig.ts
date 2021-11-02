export default {
	type: 'postgres',
	host: process.env.TYPE_ORM_HOST,
	port: process.env.TYPE_ORM_PORT,
	username: process.env.TYPE_ORM_USERNAME,
	password: process.env.TYPE_ORM_PASSWORD,
	database: process.env.TYPE_ORM_DB,
	synchronize: false,
	retryDelay: 3000,
	retryAttempts: 10,
	loggin: true,
	migrationsTableName: 'migrations',
	entities: ['src/entities/**/*.ts'],
	migrations: ['src/migrations/**/*.ts'],
	cli: {
		migrationsDir: 'src/migrations',
	},
}
