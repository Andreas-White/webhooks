import express from 'express'
import controller from '../controllers/signupController.js'

const router = express.Router()

router.get('/', controller.signupForm)
router.post('/', controller.signupProcess)

export default router
// let token = req.headers['x-gitlab-token']
// console.log('Request Headers token:')
// console.log(token)

// console.log('Request Body:')
// console.log(req.body)
// global.io.emit('webhook', req.body)
// if ('secrettoken' === token) {
//   global.io.emit('webhook-message', 'A new issue was triggered by gitlab')
// } else {
//   global.io.emit(
//     'webhook-message',
//     'A new issue was triggered, but it was not from by gitlab'
//   )
// }

// res.end()
