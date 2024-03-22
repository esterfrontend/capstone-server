const router = require("express").Router()
const { getAllCases, getOneCase, createOneCase, changeCaseStatus } = require('../controllers/cases.controller')
const passport = require('passport');

router.get('/getAll', passport.authenticate('jwt', { session: false }), getAllCases)
router.get('/getOne/:case_id', passport.authenticate('jwt', { session: false }), getOneCase)
router.post('/create', createOneCase);
router.put('/changeCaseStatus/:case_id', passport.authenticate('jwt', { session: false }), changeCaseStatus)

module.exports = router;