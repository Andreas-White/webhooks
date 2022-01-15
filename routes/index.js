import express from 'express'
import controller from '../controllers/webHookController.js'

const router = express.Router()

/* GET home page. */
router.get('/', controller.webHook)

router.get('/issue', controller.issues)

export default router
