const { Types } = require('mongoose');
const User = require('../models/user.model');

const editUser = async (req, res, next) => {
    try {
        const { _id: user_id } = req.user
        const { 
            name,
            registrationNumber,
            address,
            postalCode,
            province,
            contactPerson,
            phone,
            phoneSecondary
         } = req.body

        if (!Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user id.' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            {
                name,
                registrationNumber,
                address,
                postalCode,
                province,
                contactPerson,
                phone,
                phoneSecondary
            },
            {new: true}
        )

        res.status(200).json({message: 'User has been updated', updatedUser: updatedUser});
    } catch (err) {
        next(err)
    }
}

const removeUser = async (req, res, next) => {
    try {
        const { _id: user_id } = req.user

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
    editUser,
    removeUser
}