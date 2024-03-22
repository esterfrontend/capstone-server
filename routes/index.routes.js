const router = require("express").Router()

const casesRoutes = require("./cases.routes")
const userRoutes = require("./user.routes")
const schoolsRoutes = require("./schools.routes")
const professionalsRoutes = require("./professionals.routes")
const authRoutes = require('./auth.routes');

router.use('/cases', casesRoutes)
router.use('/user', userRoutes)
router.use('/schools', schoolsRoutes)
router.use('/professionals', professionalsRoutes)
router.use('/auth', authRoutes)

module.exports = router