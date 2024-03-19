const router = require("express").Router()
const { getOneCase, createOneCase, editCase, changeCaseStatus } = require('../controllers/case.controller')

router.get('/getOne/:case_id', getOneCase)
router.post('/create', createOneCase);
router.put('/edit/:case_id', editCase)
router.put('/changeCaseStatus/:case_id', changeCaseStatus)

module.exports = router;