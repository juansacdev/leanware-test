import { Router } from 'express'
import isAdmin from '../../middlewares/isAdmin'
import isNotClient from '../../middlewares/isNotClient'
import isOperative from '../../middlewares/isOperative'
import verifyToken from '../../middlewares/verifyToken'
import { ReportController as ReportCtrl } from './controller'

const routes = Router()

routes.get('/me', [verifyToken], ReportCtrl.fidnAllByMe)
routes.get('/', [verifyToken, isNotClient], ReportCtrl.findAllReports)
routes.get('/:id', [verifyToken, isNotClient], ReportCtrl.findOneProdById)
routes.post('/create', [verifyToken, isOperative], ReportCtrl.createOneProd)
routes.put(
	'/update/:id',
	[verifyToken, isOperative],
	ReportCtrl.updateOneProdById,
)
routes.delete(
	'/delete/:id',
	[verifyToken, isAdmin],
	ReportCtrl.deleteOneProdById,
)

export default routes
