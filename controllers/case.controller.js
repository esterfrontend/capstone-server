const { Types } = require('mongoose');
const Case = require('../models/case.model');
const School = require('../models/school.model');
const Professional = require('../models/professional.model');

const getOneCase = async (req, res, next) => {
    try {
        const { case_id } = req.params

        if (!Types.ObjectId.isValid(case_id)) {
            return res.status(400).json({ message: 'Invalid case id.' });
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
            state,
            school,
            province,
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

        const boolAnonymous = anonymous === "true" ? true : false

        if (!school) {
            return res.status(400).json({ message: 'School field is required' });
        }

        if (!province) {
            return res.status(400).json({ message: 'Province field is required' });
        }

        if (!victim) {
            return res.status(400).json({ message: 'Victim field is required' });
        }

        if (boolAnonymous.length === 0) {
            return res.status(400).json({ message: 'Anonymous field is required' });
        }

        if(boolAnonymous === false) {
            if(!informantName & !informantRelation & !informantContact) {
                return res.status(400).json({ message: 'If you are not anonymous, should fill in some information about you' });
            }
        }

        const dataInformant = {
            anonymous: boolAnonymous,
            name: informantName, 
            relation: informantRelation, 
            contact: informantContact
        }

        // FALTA ACABARLO
        
        const schoolInvolved = await School.findById(school)
        const postalCode = schoolInvolved.postalCode
        
        const newCase = {
            state,
            school,
            province,
            victim,
            place,
            how,
            attacker,
            moreInformation,
            informant: dataInformant
        }
        const createdCase = await Case.create(newCase);

        // Add case to school object
        // const schoolInvolved = await School.findByIdAndUpdate(
        //     school, 
        //     { $addToSet: { cases: createdCase._id }},
        //     { new: true }
        // )

        // // Set case to professional
        // console.log(schoolCase.postalCode)

        // const professionalCase = await Professional.findByIdAndUpdate(
        //     professional, 
        //     { $addToSet: { cases: createdCase._id }},
        //     { new: true }
        // )

        res.status(200).json({message: 'New case created', case: createdCase});
    } catch (err) {
        next(err)
    }
}

const editCase = async (req, res, next) => {
    try {
        const { case_id } = req.params

        if (!Types.ObjectId.isValid(case_id)) {
            return res.status(400).json({ message: 'Invalid case id.' });
        }

        const {
            state,
            school,
            province,
            victim,
            place,
            how,
            attacker,
            moreInformation,
            anonymous,
            informantName, 
            informantRelation, 
            informantContact,
            professional
        } = req.body;

        const boolAnonymous = anonymous === "true" ? true : false

        if (!school) {
            return res.status(400).json({ message: 'School field is required' });
        }

        if (!province) {
            return res.status(400).json({ message: 'Province field is required' });
        }

        if (!victim) {
            return res.status(400).json({ message: 'Victim field is required' });
        }

        if (boolAnonymous.length === 0) {
            return res.status(400).json({ message: 'Anonymous field is required' });
        }

        if(boolAnonymous === false) {
            if(!informantName & !informantRelation & !informantContact) {
                return res.status(400).json({ message: 'If you are not anonymous, should fill in some information about you' });
            }
        }

        const dataInformant = {
            anonymous: boolAnonymous,
            name: informantName, 
            relation: informantRelation, 
            contact: informantContact
        }

        const caseUpdated = await Case.findByIdAndUpdate(case_id, {
            state,
            school,
            province,
            victim,
            place,
            how,
            attacker,
            moreInformation,
            informant: dataInformant,
            professional
        },{ new: true })

        if(!caseUpdated) {
            return res.status(404).json({message: "Case not found."})
        }

        res.status(200).json({message: 'Case updated', case: caseUpdated});
    } catch (err) {
        next(err)
    }
}

const changeCaseStatus = async (req, res, next) => {
    try {
        const { case_id } = req.params

        if (!Types.ObjectId.isValid(case_id)) {
            return res.status(400).json({ message: 'Invalid case id.' });
        }

        const { newState } = req.body;

        if (!newState) {
            return res.status(400).json({ message: 'New state should be introduced' });
        }

        const caseUpdated = await Case.findByIdAndUpdate(case_id, {
            state
        },{ new: true })

        if(!caseUpdated) {
            return res.status(404).json({message: "Case not found."})
        }

        res.status(200).json({message: 'Case status changed', case: caseUpdated});
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getOneCase,
    createOneCase,
    editCase,
    changeCaseStatus
}