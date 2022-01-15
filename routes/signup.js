import express from 'express'
import controller from '../controllers/signupController.js'

const router = express.Router()

router.get('/', controller.signupForm)
router.post('/', controller.signupProcess)

export default router
