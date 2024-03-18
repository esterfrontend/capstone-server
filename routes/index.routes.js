const router = require("express").Router()

const caseRoutes = require("./case.routes")
const schoolRoutes = require("./school.routes")
const professionalRoutes = require("./professional.routes")

router.use('/case', caseRoutes)
router.use('/schools', schoolRoutes)
router.use('/professionals', professionalRoutes)

module.exports = router