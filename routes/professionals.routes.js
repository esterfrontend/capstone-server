const router = require("express").Router()
const passport = require('passport');
const schoolRoleMiddleware = require('../middleware/schoolRole.middleware');

const { getAllProfessionals, getOneProfessionalPrivate } = require('../controllers/professionals.controller')

router.get('/getAll', getAllProfessionals)
router.get('/getOnePrivate/:professional_id', [passport.authenticate('jwt', { session: false }), schoolRoleMiddleware], getOneProfessionalPrivate)

module.exports = router