const User = require('../models/user.model');
const { createPass } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).json({ error: true, contenido: 'Ese email ya está registrado' });
        }
        const passwordCrypt = createPass(req.body.password);
        const result = await User.create({
            email: req.body.email,
            password: passwordCrypt,
            role: req.body.role,
            name: req.body.name,
            contactPerson: req.body.contactPerson,
            registrationNumber: req.body.registrationNumber,
            address: req.body.address,
            postalCode: req.body.postalCode,
            province: req.body.province,
            phone: req.body.phone,
            phoneSecondary: req.body.phoneSecondary
        });
        res.json({ message: 'Usuario creado', contendio: result });
    } catch (error) {
        next(error)
    }
};

const login = async (req, res) => {
    res.json({
        token: jwt.sign({ user: req.user._id, role: req.user.role }, process.env.PASSPORT_SECRET, { expiresIn: '1d' }),
    });
};

const verify = async (req, res) => {
    res.json(req.user);
};

module.exports = {
    signup,
    login,
    verify
}