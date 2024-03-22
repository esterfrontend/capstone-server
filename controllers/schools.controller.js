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

        const {professionals} = await User
            .findById(school_id)
            .select('-password -role -createdAt -updatedAt')

        // FALTA
        // No funciona esta comprobación
        // 
        // console.log(professionals)
        // console.log(user_id)
        // if(professionals !== user_id) {
        //     return res.json({message: "No puedes ver este contenido."})
        // }

        if(!professionals) {
            return res.status(404).json({message: "School not found."})
        }
    
        res.status(200).json(professionals);
        
    } catch (err) {
        next(err)
    }
}

// Por el momento creo que son innnecesarias
// const getAllSchoolsPrivate = async (req, res, next) => {
//     try {
//         // FALTA: Comprobar si mi perfil tiene permiso para acceder
//         // El usuario que vea los datos privados de todos los colegios debe ser psicólogo
//         const schools = await School
//             .find({role: 'colegio'})
//             .sort({province: -1})
//             .select('-password -role -cases -createdAt -updatedAt')
            
//         res.status(200).json(schools);
//     } catch (err) {
//         next(err)
//     }
// }

// const getOneSchool = async (req, res, next) => {
//     try {
//         const { school_id } = req.params

//         if (!Types.ObjectId.isValid(school_id)) {
//             return res.status(400).json({ message: 'Invalid school id.' });
//         }

//         const school = await School
//             .findById(school_id)
//             .select('name address province')

//         if(!school) {
//             return res.status(404).json({message: "School not found."})
//         }

//         res.status(200).json(school);
//     } catch (err) {
//         next(err)
//     }
// }

module.exports = {
    getAllSchools,
    getOneSchoolPrivate
}