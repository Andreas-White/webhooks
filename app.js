import express from 'express'
import hbs from 'express-hbs'
import dir from 'path'
import logger from 'morgan'
import session from 'express-session'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
dotenv.config({ path: 'keys.env' })

import mongoose from './config/mongoose.js'

import homeRouter from './routes/home.js'
import loginRouter from './routes/login.js'
import signupRouter from './routes/signup.js'
import webHookRouter from './routes/index.js'

const app = express()
const __dirname = dir.resolve()
const SERVER_PORT = 3000
const server = createServer(app)
const socketio = new Server(server)

mongoose.connect().catch((error) => {
  console.log(error)
  process.exit(1)
})

// Setup view engine.
app.engine(
  'hbs',
  hbs.express4({
    defaultLayout: dir.join(__dirname, 'views', 'layouts', 'default'),
    partialsDir: dir.join(__dirname, 'views', 'partials'),
  })
)
app.set('views', dir.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(dir.join(__dirname, 'public')))

// Setup session
app.use(
  session({
    name: 'snippets',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
)

// Routes
app.use('/', homeRouter)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/webhooks', webHookRouter)

// sockets
let nextVisitorNumber = 1
const onlineClients = new Set()

function onNewWebsocketConnection(socket) {
  console.info(`Socket ${socket.id} has connected.`)
  onlineClients.add(socket.id)

  socket.on('disconnect', () => {
    onlineClients.delete(socket.id)
    console.info(`Socket ${socket.id} has disconnected.`)
  })

  // echoes on the terminal every "hello" message this socket sends
  socket.on('hello', (helloMsg) =>
    console.info(`Socket ${socket.id} says: "${helloMsg}"`)
  )
}

socketio.on('connection', onNewWebsocketConnection)

global.io = socketio

let secondsSinceServerStarted = 0
setInterval(() => {
  secondsSinceServerStarted++
  socketio.emit('seconds', secondsSinceServerStarted)
  // socketio.emit('online', onlineClients.size)
}, 1000)

// 404 error handling
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(dir.join(__dirname, 'public', 'html', 'errors', '404.html'))
})

// 500 error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.sendFile(dir.join(__dirname, 'public', 'html', 'errors', '500.html'))
})

// listen to port 3000
server.listen(SERVER_PORT, () => {
  console.log('Server started on http://localhost:3000')
  console.log('Press Ctrl-C to terminate...')
})
