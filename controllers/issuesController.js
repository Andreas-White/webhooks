import dir from 'path'

const issues = (req, res) => {
  const user = req.params.user
  const flash = req.session.flash
  req.session.flash = null

  if (req.session.user !== user) {
    req.session.flash =
      'You have to login if already have an account or sign up to create one, in order to access forbidden resources'
    res.sendFile(dir.join(__dirname, 'public', 'html', 'errors', '403.html'))
  }

  res.render('issues', {
    flash: flash,
    user: user,
  })
}

export default {
  issues,
}
