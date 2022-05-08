import { Router } from 'express'
import isOperative from '../../middlewares/isOperative'
import verifyToken from '../../middlewares/verifyToken'
import { FileController } from './controller'

const routes = Router()

routes.post('/upload', [verifyToken, isOperative], FileController.upload)
routes.post('/download', [verifyToken, isOperative], FileController.download)

export default routes
