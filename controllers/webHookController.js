const webHook = (req, res) => {
  console.log('Received webhook get request')

  console.log('Request Head:')
  console.log(req.head)

  console.log('Request Body:')
  console.log(req.body)
}

export default {
  webHook,
}
