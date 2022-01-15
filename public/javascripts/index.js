async function main() {
  // call sample API
  let issues = await fetch('/webhooks/issue', {
    method: 'get',
  })
    .then((res) => {
      return res.json()
    })
    .then((jsonData) => {
      return JSON.parse(JSON.stringify(jsonData))
    })
    .catch((err) => console.log(err))

  let issueDiv = document.getElementById('issues')
  issues.forEach((issue) => {
    let title = document.createElement('h3')
    title.innerText = 'Title: ' + issue.title
    let projectId = document.createElement('p')
    projectId.innerText = 'Project id : ' + issue.project_id
    let state = document.createElement('p')
    state.innerText = 'State : ' + issue.state
    let description = document.createElement('p')
    description.innerText = 'Description: ' + issue.description
    let name = document.createElement('p')
    name.innerText = 'Author name: ' + issue.author.name

    let issueInnerDiv = document.createElement('div')
    issueInnerDiv.setAttribute('style', 'margin: 1rem')
    issueInnerDiv.setAttribute('style', 'background-color: aliceblue')

    issueInnerDiv.appendChild(title)
    issueInnerDiv.appendChild(projectId)
    issueInnerDiv.appendChild(state)
    issueInnerDiv.appendChild(description)
    issueInnerDiv.appendChild(name)

    issueDiv.appendChild(issueInnerDiv)
  })

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

  const onlineElement = document.getElementById('message')

  socket.on('webhook-message', (message) => (onlineElement.innerText = message))

  socket.on('webhook', (online) => {
    let title = document.createElement('h3')
    title.innerText = 'Title: ' + online.object_attributes.title
    let projectId = document.createElement('p')
    projectId.innerText = 'Project id : ' + online.object_attributes.project_id
    let state = document.createElement('p')
    state.innerText = 'State : ' + online.object_attributes.state
    let description = document.createElement('p')
    description.innerText =
      'Description: ' + online.object_attributes.description
    let name = document.createElement('p')
    name.innerText = 'Author name: ' + online.user.name

    let issueInnerDiv = document.createElement('div')
    issueInnerDiv.setAttribute('style', 'margin: 1rem')
    issueInnerDiv.setAttribute('style', 'background-color: aliceblue')

    issueInnerDiv.appendChild(title)
    issueInnerDiv.appendChild(projectId)
    issueInnerDiv.appendChild(state)
    issueInnerDiv.appendChild(description)
    issueInnerDiv.appendChild(name)

    issueDiv.appendChild(issueInnerDiv)
  })
}

main()
