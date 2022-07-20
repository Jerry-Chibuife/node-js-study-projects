const express = require('express')
const router = express.Router()

const authenticationMiddleWare = require('../middleware/auth')

const {login, dashboard} = require('../controllers/main')

router.route('/dashboard').get(authenticationMiddleWare, dashboard)
router.route('/login').post(login)

module.exports = router