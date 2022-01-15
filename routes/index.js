import express from 'express'
import controller from '../controllers/webHookController.js'

const router = express.Router()

/* GET home page. */
router.get('/', controller.webHook)

router.get('/issue', controller.issues)

// router.post('/', function (req, res, next) {
//   console.log(req.body)
// })

export default router
