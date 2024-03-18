const { Router } = require('express')

const { getAllProfessionals, getOneProfessional, editProfessional, removeProfessional } = require('../controllers/professional.controller')

const router = Router()

router.get('/', getAllProfessionals)
router.get('/getOne/:professional_id', getOneProfessional)
router.put('/edit/:professional_id', editProfessional)
router.delete('/remove/:professional_id', removeProfessional)

module.exports = router