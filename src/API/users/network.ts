import { Router } from 'express'
import isAdmin from '../../middlewares/isAdmin'
import notClient from '../../middlewares/isNotClient'
import verifyToken from '../../middlewares/verifyToken'
import { UserController as UserCtrl } from './controller'

const routes = Router()

routes.get('/me', [verifyToken], UserCtrl.findMe)
routes.put('/update/me', [verifyToken], UserCtrl.updateMe)
routes.delete('/delete/me', [verifyToken], UserCtrl.deleteMe)

routes.get('/', [verifyToken, notClient], UserCtrl.findAllUsers)
routes.get('/:id', [verifyToken, notClient], UserCtrl.findOneUserById)
routes.put('/update/:id', [verifyToken, isAdmin], UserCtrl.updateOneUserById)
routes.delete('/delete/:id', [verifyToken, isAdmin], UserCtrl.deleteOneUserById)

export default routes
