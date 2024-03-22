const { Types } = require('mongoose');
const User = require('../models/user.model');

const getAllProfessionals = async (req, res, next) => {
    try {
        const professionals = await User
            .find({role: 'profesional'})
            .sort({province: -1})
            .select('name email postalCode province')

        res.status(200).json(professionals);
    } catch (err) {
        next(err)
    }
}

const getOneProfessionalPrivate = async (req, res, next) => {
    try {
        const { _id: user_id } = req.user
        const { professional_id } = req.params

        if (!Types.ObjectId.isValid(professional_id)) {
            return res.status(400).json({ message: 'Invalid school id.' });
        }

        const professional = await User
            .findOne({_id: professional_id, role: 'profesional'})
            .select('-password -role -createdAt -updatedAt')
        
        if(!professional.schools.includes(user_id)) {
            return res.json({message: "No puedes ver este contenido."})
        }

        res.status(200).json(professional);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllProfessionals,
    getOneProfessionalPrivate
}