import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('Received webhook get request to /webhook-receive')
  console.log('Request body:')
  console.log(req.body)
  res.render('index', { title: 'Express' })
})

export default router
