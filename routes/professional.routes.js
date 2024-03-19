const router = require("express").Router()

const { getAllProfessionals, getOneProfessional, editProfessional, removeProfessional } = require('../controllers/professional.controller')

router.get('/', getAllProfessionals)
router.get('/getOne/:professional_id', getOneProfessional)
router.put('/edit/:professional_id', editProfessional)
router.delete('/remove/:professional_id', removeProfessional)

module.exports = router