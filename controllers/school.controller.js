const { Types } = require('mongoose');
const School = require('../models/school.model');

const getAllSchools = async (req, res, next) => {
    try {
        const schools = await School.find()
        res.status(200).json(schools);
    } catch (err) {
        next(err)
    }
}

const getOneSchool = async (req, res, next) => {
    try {
        const { school_id } = req.params

        if (!Types.ObjectId.isValid(school_id)) {
            return res.status(400).json({ message: 'Invalid school id.' });
        }

        const school = await School.findById(school_id)

        if(!school) {
            return res.status(404).json({message: "School not found."})
        }

        res.status(200).json(school);
    } catch (err) {
        next(err)
    }
}

const getMyCases = async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err)
    }
}

const editSchool = async (req, res, next) => {
    try {
        const { school_id } = req.params

        if (!Types.ObjectId.isValid(school_id)) {
            return res.status(400).json({ message: 'Invalid school id.' });
        }

        const {
            province,
            name,
            address,
            postalCode,
            phone,
            email
        } = req.body;

        if(!province || !name || !address || !postalCode || !phone || !email) {
            return res.status(400).json({message: 'Please fill in all fields.'})
        }

        const school = await School.findByIdAndUpdate(school_id, {
            province,
            name,
            address,
            postalCode,
            phone,
            email
        },{ new: true })

        if(!school) {
            return res.status(404).json({message: "School not found."})
        }

        res.status(200).json(school);
    } catch (err) {
        next(err)
    }
}

const removeSchool = async (req, res, next) => {
    try {
        const { school_id } = req.params

        if (!Types.ObjectId.isValid(school_id)) {
            return res.status(400).json({ message: 'Invalid school id.' });
        }

        const school = await School.findByIdAndDelete(school_id)

        if(!school) {
            return res.status(404).json({message: "School not found."})
        }

        res.status(200).json({message: 'School successfully deleted.'});
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllSchools,
    getOneSchool,
    getMyCases,
    editSchool,
    removeSchool
}