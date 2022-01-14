//const fetch = require('node-fetch')

async function ajax(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.addEventListener('load', function () {
      try {
        resolve(this.responseText)
      } catch (error) {
        reject(error)
      }
    })
    request.open('GET', url)
    request.send()
    request.addEventListener('error', reject)
  })
}

/** @returns {void} */
async function main() {
  // call sample API
  // let host = await ajax('/webhooks')
  // document.getElementById('random-number').innerText = host
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
  document.getElementById('random-number').innerText = issues[0].created_at

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
  socket.on('online', (online) => (onlineElement.innerText = online.toString()))
}

main()
