const webHook = (req, res) => {
  console.log('Received webhook get request')

  console.log('Request Headers:')
  console.log(req.headers.host.x-gitlab-token)

  console.log('Request Body:')
  console.log(req.body)

  res.sendStatus(200)
}

export default {
  webHook,
}
