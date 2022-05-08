import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'
import config from './config'
import {
	errorHandler,
	logErrors,
	wrapErrors,
} from './middlewares/errorHandlers'
import notFoundHandler from './middlewares/notFound'
import router from './routes'
import { setInitalValues } from './utils/initialSetUpDB'

const app: Application = express()

if (config.isDev) app.use(morgan('dev'))

app.use(cors())

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app)

// Error 404
app.use(notFoundHandler)

// Errors middlewares
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

createConnection()
	.then(async (connection: Connection) => {
		await setInitalValues(connection)
		app.listen(config.port)
	})
	.catch()
