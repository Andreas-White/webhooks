import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/', function (req, res, next) {
  console.log('Received webhook request to /webhook-receive')
  console.log('Request body:')
  console.log(req.body)
})

export default router
