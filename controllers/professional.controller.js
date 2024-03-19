const { Types } = require('mongoose');
const Professional = require('../models/professional.model');

const getAllProfessionals = async (req, res, next) => {
    try {
        const professionals = await Professional.find().sort({province: -1}).lean()
        res.status(200).json(professionals);
    } catch (err) {
        next(err)
    }
}


const getOneProfessional = async (req, res) => {
    try {
        const { professional_id } = req.params

        if (!Types.ObjectId.isValid(professional_id)) {
            return res.status(400).json({ message: 'Invalid Professional id.' });
        }

        const professional = await Professional.findById(professional_id)

        if(!professional) {
            return res.status(404).json({message: "Professional not found."})
        }

        res.status(200).json(professional);
    } catch (err) {
        next(err)
    }
}

const editProfessional = async (req, res, next) => {
    try {
        const { professional_id } = req.params

        if (!Types.ObjectId.isValid(professional_id)) {
            return res.status(400).json({ message: 'Invalid professional id.' });
        }

        const {
            province,
            name,
            surname,
            registrationNumber,
            address,
            postalCode,
            phone,
            email
        } = req.body;

        if(!province || !name || !surname || !registrationNumber || !address || !postalCode || !phone || !email) {
            return res.status(400).json({message: 'Please fill in all fields.'})
        }

        const professional = await Professional.findByIdAndUpdate(professional_id, {
            province,
            name,
            surname,
            registrationNumber,
            address,
            postalCode,
            phone,
            email
        },{ new: true })

        if(!professional) {
            return res.status(404).json({message: "Professional not found."})
        }

        res.status(200).json(professional);
    } catch (err) {
        next(err)
    }
}

const removeProfessional = async (req, res, next) => {
    try {
        const { professional_id } = req.params

        if (!Types.ObjectId.isValid(professional_id)) {
            return res.status(400).json({ message: 'Invalid professional id.' });
        }

        const professional = await Professional.findByIdAndDelete(professional_id)

        if(!professional) {
            return res.status(404).json({message: "Professional not found."})
        }

        res.status(200).json({message: 'Professional successfully deleted.'});
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllProfessionals,
    getOneProfessional,
    editProfessional,
    removeProfessional
}