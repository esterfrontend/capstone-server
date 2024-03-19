const router = require("express").Router()

const caseRoutes = require("./case.routes")
const userRoutes = require("./user.routes")
const schoolRoutes = require("./school.routes")
const professionalRoutes = require("./professional.routes")
const authRoutes = require('./auth.routes');

router.use('/case', caseRoutes)
router.use('/users', userRoutes)
router.use('/schools', schoolRoutes)
router.use('/professionals', professionalRoutes)
router.use('/auth', authRoutes)

module.exports = router