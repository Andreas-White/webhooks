import express from 'express'
import controller from '../controllers/webHookController.js'

const router = express.Router()

/* GET home page. */
router.get('/', controller.webHook)

// router.get('/', function(req, res) {
//   res.sendStatus(200);
// })

export default router
