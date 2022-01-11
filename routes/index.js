import express from 'express'
import controller from '../controllers/webHookController.js'
import fetch from 'node-fetch'

const router = express.Router()

/* GET home page. */
router.get('/', controller.webHook)

router.get('/issue', async (req, res) => {
  const url = 'https://gitlab.lnu.se/api/v4/projects/20151/issues'

  const headers = {
    'PRIVATE-TOKEN': 'AjkME5VHNem5mXYSSrAX',
  }

  let issues = await fetch(url, { method: 'GET', headers: headers })
    .then((res) => res.json())
    .catch((err) => console.log(err))

  console.log(issues)
  res.send(200)
})

export default router
