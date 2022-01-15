/** @returns {void} */
async function main() {
  // call sample API
  let issues = await fetch('/webhooks/issue', {
    method: 'get',
  })
    .then((res) => {
      return res.json()
    })
    .then((jsonData) => {
      //console.log(JSON.parse(JSON.stringify(jsonData)))
      return JSON.parse(JSON.stringify(jsonData))
    })
    .catch((err) => console.log(err))

  console.log(issues)
  console.log(issues[0].created_at)
  document.getElementById('random-number').innerText = JSON.stringify(issues)

  const socket = io()
  socket.on('connect', () =>
    socket.emit('hello', `Hi there! I am ${window.navigator.userAgent}`)
  )

  const secondsElement = document.getElementById('seconds')
  socket.on(
    'seconds',
    (seconds) => (secondsElement.innerText = seconds.toString())
  )

  const welcomeElement = document.getElementById('welcome')
  socket.on(
    'welcome',
    (welcomeMessage) => (welcomeElement.innerText = welcomeMessage)
  )

  const onlineElement = document.getElementById('online')
  socket.on('online', (online) => {
    console.log(online)
    onlineElement.innerText += JSON.stringify(online)
  })
}

main()
