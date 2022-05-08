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
	migrationsTableName: 'migrations',
	entities: ['dist/src/entities/**/*'],
	migrations: ['dist/src/migrations/**/*.js'],
	cli: {
		migrationsDir: 'dist/migrations',
	},
}
