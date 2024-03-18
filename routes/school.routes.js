const { Router } = require('express')

const { getAllSchools, getOneSchool, getMyCases, editSchool, removeSchool } = require('../controllers/school.controller')

const router = Router()

router.get('/', getAllSchools)
router.get('/getOne/:school_id', getOneSchool)
router.get('/getMyCases/:school_id', getMyCases)
router.put('/edit/:school_id', editSchool)
router.delete('/remove/:school_id', removeSchool)

module.exports = router