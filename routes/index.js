import express from 'express'
import controller from '../controllers/webHookController.js'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config({ path: 'keys.env' })

const router = express.Router()

/* GET home page. */
router.get('/', controller.webHook)

router.get('/issue', async (req, res) => {
  const url = process.env.GITLAB_URL

  const headers = {
    'PRIVATE-TOKEN': process.env.GITLAB_TOKEN,
  }

  let issues = await fetch(url, { method: 'GET', headers: headers })
    .then((res) => res.json())
    .catch((err) => console.log(err))

  //console.log(issues)
  res.send(issues)
})

router.post('/', function (req, res, next) {
  console.log(req.body)
})

export default router
