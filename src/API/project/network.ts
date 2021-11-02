import { Router } from 'express'
import isAdmin from '../../middlewares/isAdmin'
import isClient from '../../middlewares/isClient'
import isOperative from '../../middlewares/isOperative'
import verifyToken from '../../middlewares/verifyToken'
import { ProjectController as ProjCtrl } from './controller'

const routes = Router()

routes.get('/', [verifyToken], ProjCtrl.findAllProds)
routes.get('/:id', [verifyToken], ProjCtrl.findOneProdById)
routes.post('/create', [verifyToken, isClient], ProjCtrl.createOneProd)
routes.put('/update/:id', [verifyToken, isAdmin], ProjCtrl.updateOneProdById)
routes.delete('/delete/:id', [verifyToken, isAdmin], ProjCtrl.deleteOneProdById)

export default routes
