const webHook = (req, res) => {
  console.log('Received webhook get request')

  console.log('Request Headers:')
  console.log(req.headers)

  console.log('Request Headers token:')
  console.log(req.headers['x-gitlab-token'])

  console.log('Request Body:')
  console.log(req.body)

  res.json(req.body)
}

export default {
  webHook,
}