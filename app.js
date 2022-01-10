import express from 'express'
import hbs from 'express-hbs'
import dir from 'path'
import logger from 'morgan'
import session from 'express-session'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

const app = express()
const __dirname = dir.resolve()

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
    secret: '*A&sd(Ddf*43&54*12Y43ud',
  })
)

// Routes
app.use('/webhooks', indexRouter)
app.use('/webhooks/users', usersRouter)

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
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
  console.log('Press Ctrl-C to terminate...')
})
