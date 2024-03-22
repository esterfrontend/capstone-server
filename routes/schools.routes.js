const router = require("express").Router()
const { getAllSchools, getOneSchoolPrivate } = require('../controllers/schools.controller')
const passport = require('passport');
const professionalRoleMiddleware = require('../middleware/professionalRole.middleware');

router.get('/getAll', getAllSchools)
router.get('/getOnePrivate/:school_id', [passport.authenticate('jwt', { session: false }), professionalRoleMiddleware], getOneSchoolPrivate)

module.exports = router