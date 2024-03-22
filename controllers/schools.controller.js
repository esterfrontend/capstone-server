const { Types } = require('mongoose');
const User = require('../models/user.model');

const getAllSchools = async (req, res, next) => {
    try {
        const schools = await User
            .find({role: 'colegio'})
            .sort({province: -1})
            .select('name address postalCode province')

        res.status(200).json(schools);
    } catch (err) {
        next(err)
    }
}

const getOneSchoolPrivate = async (req, res, next) => {
    try {
        const { _id: user_id } = req.user
        const { school_id } = req.params

        if (!Types.ObjectId.isValid(school_id)) {
            return res.status(400).json({ message: 'Invalid school id.' });
        }

        const school = await User
            .findOne({_id: school_id, role: 'school'})
            .select('-password -role -createdAt -updatedAt')

        if(!school.professionals.includes(user_id)) {
            return res.json({message: "No puedes ver este contenido."})
        }
    
        res.status(200).json(school);
        
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllSchools,
    getOneSchoolPrivate
}