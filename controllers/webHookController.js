import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config({ path: 'keys.env' })
import dir from 'path'

const __dirname = dir.resolve()

const webHook = (req, res) => {
  let token = req.headers['x-gitlab-token']

  global.io.emit('webhook', req.body)
  if ('secrettoken' === token) {
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

  // if (!req.session.user) {
  //   req.session.flash =
  //     'You have to login if already have an account or sign up to create one, in order to access forbidden resources'
  //   res.sendFile(dir.join(__dirname, 'public', 'html', 'errors', '403.html'))
  // }

  let issues = await fetch(url, { method: 'GET', headers: headers })
    .then((res) => res.json())
    .catch((err) => console.log(err))

  res.send(issues)
}

export default {
  webHook,
  issues,
}
