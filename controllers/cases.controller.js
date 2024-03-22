const { Types } = require('mongoose');
const User = require('../models/user.model');
const Case = require('../models/case.model');
const School = require('../models/user.model');

const getAllCases = async (req, res, next) => {
    try {
        const { _id: user_id } = req.user

        const user = await User.findById(user_id)
        
        if(!user.cases) {
            return res.status(404).json({message: "User not found."})
        }

        res.status(200).json(user.cases);
    } catch (err) {
        next(err)
    }
}

const getOneCase = async (req, res, next) => {
    try {
        const { _id: user_id } = req.user
        const { case_id } = req.params

        if (!Types.ObjectId.isValid(case_id)) {
            return res.status(400).json({ message: 'Invalid case id.' });
        }

        const {cases} = await User.findById(user_id).select('cases')

        if(!cases.includes(case_id)) {
            return res.status(500).json({message: "No permissions."})
        }

        const occurrence = await Case.findById(case_id)

        if(!occurrence) {
            return res.status(404).json({message: "Case not found."})
        }

        res.status(200).json(occurrence);
    } catch (err) {
        next(err)
    }
}

const createOneCase = async (req, res, next) => {
    try {
        const {
            school,
            victim,
            place,
            how,
            attacker,
            moreInformation,
            anonymous,
            informantName, 
            informantRelation, 
            informantContact
        } = req.body

        if (!school || !victim) {
            return res.status(400).json({ message: 'School field is required' });
        }

        const {professionals} = await School.findById(school).select('professionals')

        let professional = undefined
        if(professionals.length > 1) {
            professional = Math.floor(Math.random() * professionals.length)
        } else {
            professional = professionals
        }

        let dataInformant = {
            anonymous: anonymous
        }

        if(anonymous === false ) {
            if (!informantName && !informantRelation && !informantContact) {
                return res.status(400).json({ message: 'Information about you is necessary' });
            }
            dataInformant = {
                name: informantName, 
                relation: informantRelation, 
                contact: informantContact
            }
        }

        const newCase = await Case.create({
            status: 'abierto',
            school,
            professional,
            victim,
            place,
            how,
            attacker,
            moreInformation,
            informant: dataInformant
        });

        await User.findByIdAndUpdate(
            school,
            { $addToSet: { cases: newCase } },
            { new: true }
        )
        await User.findByIdAndUpdate(
            professional,
            { $addToSet: { cases: newCase } },
            { new: true }
        )

        res.status(200).json({message: 'New case created', case: newCase});
    } catch (err) {
        next(err)
    }
}

const changeCaseStatus = async (req, res, next) => {
    try {
        const { _id: user_id } = req.user
        const { status: newStatus } = req.body
        const { case_id } = req.params

        if (!Types.ObjectId.isValid(case_id) || !Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid case id.' });
        }

        if (!newStatus) {
            return res.status(400).json({ message: 'New status should be introduced' });
        }

        const {cases} = await User.findById(user_id).select('cases')

        if(!cases.includes(case_id)) {
            return res.status(500).json({message: "No permissions."})
        }

        const updatedCase = await Case.findByIdAndUpdate(
            case_id, 
            { status: newStatus },
            { new: true })

        if(!updatedCase) {
            return res.status(404).json({message: "Case not found."})
        }

        res.status(200).json({message: 'Case status changed', updatedCase: updatedCase});
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllCases,
    getOneCase,
    createOneCase,
    changeCaseStatus
}