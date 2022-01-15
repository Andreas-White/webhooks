import express from 'express'
import homePage from '../controllers/homeController.js'
import issuesController from '../controllers/issuesController.js'

const router = express.Router()

router.get('/', homePage.getHomePage)

router.get('/issues/:user', issuesController.issues)

export default router
