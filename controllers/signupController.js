import bcrypt from 'bcrypt'
import model from '../models/user.js'

/**
 * @param req
 * @param res
 */
const signupForm = (req, res) => {
  const flash = req.session.flash
  req.session.flash = null

  res.render('signup', {
    flash: flash,
  })
}

/**
 * @param req
 * @param res
 */
const signupProcess = async (req, res) => {
  const saltRounds = 10

  const userName = req.body.user
  const password = bcrypt.hashSync(req.body.password, saltRounds)

  await model.User.findOne({ name: userName })
    .then((result) => {
      if (!result) {
        const user = new model.User({
          name: userName,
          password: password,
        })

        user
          .save()
          .then(() => {
            req.session.user = userName
            req.session.flash = `You have registered as '${userName}'.`
            res.redirect(`/issues/${userName}`)
          })
          .catch((err) => {
            console.log(err)
            req.session.flash = 'You failed to register.'
            res.redirect('/signup')
          })
      } else {
        req.session.flash =
          'You failed to register. This username is already in use. Try another one.'
        res.redirect('/signup')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export default {
  signupForm,
  signupProcess,
}
