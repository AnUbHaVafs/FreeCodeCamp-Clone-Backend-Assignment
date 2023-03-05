const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.addUser = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;


    const userExists = await User.findOne({ email: userEmail });
    if (userExists) {
        res.status(200).json({
            status: "success",
            message: "Email id already exists"
        })
    }
    else {
        const newUser = {
            name: userName,
            email: userEmail,
            password: userPassword
        }
        const addedUser = await User.create(newUser);
        await addedUser.save();

        const token = await jwt.sign({ _id: addedUser._id, role: "Admin" }, process.env.JWT_SECRET, { expiresIn: 7 });

        if (addedUser) {
            res.status(200).json({
                status: "success",
                message: "User has been added Successfully!",
                data: addedUser,
                token: token
            })
        }
        else {
            res.status(400).json({
                status: "failure",
                message: "User has not been Added!"
            })
        }

    }

}