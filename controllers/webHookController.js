const webHook = (req, res) => {
  console.log('Received webhook get request')

  // console.log('Request Head:')
  // console.log(req.header)

  console.log('Request Body:')
  console.log(req.body)
}

export default {
  webHook,
}
