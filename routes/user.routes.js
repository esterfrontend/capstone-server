const router = require("express").Router()
const { editUser, removeUser } = require('../controllers/user.controller')
const passport = require('passport');

router.put('/editUser', passport.authenticate('jwt', { session: false }), editUser)
router.delete('/remove', passport.authenticate('jwt', { session: false }), removeUser)

module.exports = router