import { Application } from 'express'
import auth from '../API/auth/network'
import project from '../API/project/network'
import report from '../API/report/network'
import user from '../API/users/network'
import file from '../API/files/network'

const routes = (server: Application): void => {
	server.use('/api/auth', auth)
	server.use('/api/user', user)
	server.use('/api/project', project)
	server.use('/api/report', report)
	server.use('/api/file', file)
}

export default routes
