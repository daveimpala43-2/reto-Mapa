import {Router} from 'express'

import {getStores, insertStore, updateStore, deleteStore} from './controller/storeController/index.js'
import {loggin, verifyToken} from './controller/userController/index.js'

const router = Router()

router.route('/store')
		.get(getStores)
		.post(verifyToken, insertStore)

router.route('/store/change/:id')
		.put(verifyToken, updateStore)
		.delete(verifyToken, deleteStore)
		// .put(updateStore)

router.route('/user')
		.post(loggin)


export default router