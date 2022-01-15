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
  if (secrettoken === req.headers['x-gitlab-token']) {
    global.io.emit('webhook-message', 'A new issue was triggered by gitlab')
  } else {
    global.io.emit(
      'webhook-message',
      'A new issue was triggered, but it was not from by gitlab'
    )
  }

  res.end()
}

const issues = async (req, res) => {
  const url = process.env.GITLAB_URL

  const headers = {
    'PRIVATE-TOKEN': process.env.GITLAB_TOKEN,
  }

  let issues = await fetch(url, { method: 'GET', headers: headers })
    .then((res) => res.json())
    .catch((err) => console.log(err))

  res.send(issues)
}

export default {
  webHook,
  issues,
}
