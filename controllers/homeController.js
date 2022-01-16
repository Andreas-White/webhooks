const getHomePage = async (req, res) => {
  const flash = req.session.flash
  const userName = req.session.user
  req.session.flash = null

  res.render('index', {
    flash: flash,
    user: req.session.user,
    session: JSON.stringify(req.session, null, 2),
  })
}

export default {
  getHomePage,
}
