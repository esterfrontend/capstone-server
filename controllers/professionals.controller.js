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

        if (!Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid school id.' });
        }

        const {professionals} = await User
            .findByID(user_id)
            .select('-password -role -createdAt -updatedAt')
        
       // FALTA
        // No funciona esta comprobación
        // 
        // console.log(professionals)
        // console.log(user_id)
        // if(professionals !== user_id) {
        //     return res.json({message: "No puedes ver este contenido."})
        // }

        if(!school || school.length === 0) {
            return res.status(404).json({message: "Access forbidden"})
        }

        res.status(200).json(school);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllProfessionals,
    getOneProfessionalPrivate
}