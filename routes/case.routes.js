const { Router } = require('express')

const { getOneCase, createOneCase, editCase, changeCaseStatus } = require('../controllers/case.controller')

const router = Router()

router.get('/getOne/:case_id', getOneCase)
router.post('/create', createOneCase);
router.put('/edit/:case_id', editCase)
router.delete('/changeCaseStatus/:case_id', changeCaseStatus)

module.exports = router;