import bcrypt from 'bcrypt'
import model from '../models/user.js'
import dir from 'path'

const __dirname = dir.resolve()

const loginForm = (req, res) => {
  const flash = req.session.flash
  req.session.flash = null

  res.render('login', {
    flash: flash,
  })
}

const loginProcess = (req, res) => {
  const user = req.body.user
  const password = req.body.password

  model.User.findOne({
    name: user,
  })
    .then((result) => {
      if (result && bcrypt.compareSync(password, result.password)) {
        req.session.user = user
        req.session.flash = `You have authenticated as '${user}'.`
        res.redirect(`/issues/${user}`)
      } else {
        req.session.flash = 'You failed to authenticate.'
        res.redirect('/login')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const logoutForm = (req, res) => {
  if (!req.session.user) {
    req.session.flash =
      'You have to login if already have an account or sign up to create one, in order to access forbidden resources'
    res.sendFile(dir.join(__dirname, 'public', 'html', 'errors', '403.html'))
  }

  const user = req.session.user
  res.render('logoutForm', { user })
}

const logoutProcess = (req, res) => {
  req.session.user = null
  req.session.flash = 'You have logged out.'
  res.redirect('/')
}

export default {
  loginForm,
  loginProcess,
  logoutForm,
  logoutProcess,
}
