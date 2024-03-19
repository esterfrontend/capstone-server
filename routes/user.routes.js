const router = require("express").Router()
const { getAllUsers, getOneUser, getAllMyCases, editUser, removeUser } = require('../controllers/user.controller')
const passport = require('passport');

router.get('/', 
    passport.authenticate('jwt', { session: false }), 
    getAllUsers
)
router.get('/getOne', 
    passport.authenticate('jwt', { session: false }), 
    getOneUser
)
router.get('/getAllMyCases', 
    passport.authenticate('jwt', { session: false }), 
    getAllMyCases
)
router.put('/editUser', 
    passport.authenticate('jwt', { session: false }), 
    editUser
)
router.delete('/remove', 
    passport.authenticate('jwt', { session: false }), 
    removeUser
)

module.exports = router