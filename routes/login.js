import express from 'express'
import controller from '../controllers/loginController.js'

const router = express.Router()

router.get('/', controller.loginForm)
router.post('/', controller.loginProcess)

router.get('/logout', controller.logoutForm)
router.post('/logout', controller.logoutProcess)

export default router
