const User = require('../models/user.model');
const { createPass } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    try {
        const {
            email,
            password,
            role,
            name,
            registrationNumber,
            address,
            postalCode,
            province,
            contactPerson,
            phone,
            phoneSecondary,
            professional_id
        } = req.body

        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ error: true, contenido: 'Ese email ya está registrado' });
        }
        
        const passwordCrypt = createPass(password);

        if(role === 'colegio') {
            const {role: professionalRole} = await User.findById(professional_id).select('role')
            
            if(professionalRole !== 'profesional') {
                return res.status(400).json({ message: 'Invalid professional id.' });
            }
        }
        
        const createdUser = await User.create({
            email,
            password: passwordCrypt,
            role,
            name,
            contactPerson,
            registrationNumber,
            address,
            postalCode,
            province,
            phone,
            phoneSecondary,
            professional: [professional_id],
            cases: []
        });

        res.json({ message: 'Usuario creado', newUser: createdUser });
    } catch (error) {
        next(error)
    }
};

const login = (req, res) => {
    res.json({
        token: jwt.sign({ user: req.user._id, role: req.user.role }, process.env.PASSPORT_SECRET, { expiresIn: '1d' }),
    });
};

const getProfile = (req, res) => {
    res.json(req.user);
};

module.exports = {
    signup,
    login,
    getProfile
}