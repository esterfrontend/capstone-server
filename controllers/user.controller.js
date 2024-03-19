const { Types } = require('mongoose');
const User = require('../models/user.model');

// FALTA: Diferenciar por roles
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort({province: -1}).lean()
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
}

const getOneUser = async (req, res, next) => {
    try {
        const { _id: user_id } = req.user

        const user = await User.findById(user_id).lean()

        if(!user) {
            return res.status(404).json({message: "User not found."})
        }

        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

const getAllMyCases = async (req, res, next) => {
    try {
        const { _id: user_id } = req.user

        const user = await User.findById(user_id).populate('cases').lean()

        if(!user) {
            return res.status(404).json({message: "User not found."})
        }

        res.status(200).json(user.cases);
    } catch (err) {
        next(err)
    }
}

// FALTA: todo
const editUser = async (req, res, next) => {
    try {
        const { user_id } = req.params

        if (!Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user id.' });
        }

        res.status(200).json(user_id);
    } catch (err) {
        next(err)
    }
}

const removeUser = async (req, res, next) => {
    try {
        const { user_id } = req.params

        if (!Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user id.' });
        }

        const user = await User.findByIdAndDelete(user_id)

        if(!user) {
            return res.status(404).json({message: "User not found."})
        }

        res.status(200).json({message: 'User successfully deleted.'});
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    getAllMyCases,
    editUser,
    removeUser
}