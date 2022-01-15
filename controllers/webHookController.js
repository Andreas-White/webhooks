import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config({ path: 'keys.env' })

const webHook = (req, res) => {
  console.log('Received webhook get request')

  console.log('Request Headers:')
  console.log(req.headers)

  console.log('Request Headers token:')
  console.log(req.headers['x-gitlab-token'])

  console.log('Request Body:')
  console.log(req.body)
  global.io.emit('webhook', req.body)
  global.io.emit('webhook-message', 'a new issue triggered')

  res.json(req.body)
}

const issues = async (req, res) => {
  const url = process.env.GITLAB_URL

  const headers = {
    'PRIVATE-TOKEN': process.env.GITLAB_TOKEN,
  }

  let issues = await fetch(url, { method: 'GET', headers: headers })
    .then((res) => res.json())
    .catch((err) => console.log(err))

  console.log(issues[0].created_at)
  global.io.emit('online', issues[0])
  res.send(issues)
}

export default {
  webHook,
  issues,
}
