const webHook = (req, res) => {
  console.log('Received webhook get request')

  console.log('Request Headers:')
  console.log(req.headers)

  // let headers = req.headers

  // headers.forEach((head) => {
  //   console.log(head + ' ----- ')
  // })

  // console.log('Request Headers token:')
  // console.log(req.headers.x-gitlab-token)

  console.log('Request Body:')
  console.log(req.body)

  res.sendStatus(200)
}

export default {
  webHook,
}
