import boom from '@hapi/boom'
import { Request, Response } from 'express'

const notFoundHandler = (_req: Request, res: Response): void => {
	const {
		output: { statusCode, payload },
	} = boom.notFound()

	res.status(statusCode).json(payload)
}

export default notFoundHandler
