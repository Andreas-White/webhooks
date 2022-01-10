const webHook = (req, res) => {
  console.log('Received webhook get request')

  console.log('Request Headers:')
  console.log(req.headers)

  let headers = req.headers
  let arrHeaders = []

  headers.forEach((head) => {
    arrHeaders.push(head)
  })

  console.log('New Headers:')
  console.log(arrHeaders)

  // console.log('Request Headers token:')
  // console.log(req.headers.x-gitlab-token)

  console.log('Request Body:')
  console.log(req.body)

  res.sendStatus(200)
}

export default {
  webHook,
}
