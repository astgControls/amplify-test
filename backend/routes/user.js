const express = require('express')

//controller functions
const {signupUser, loginUser, getUsers} = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

// require auth for list route
router.use(requireAuth)

//user list route
router.get('/', getUsers)

module.exports = router