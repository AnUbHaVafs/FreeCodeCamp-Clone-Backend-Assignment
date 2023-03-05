const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        password: this.password,
        role: "Admin"
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    return token;
}

module.exports = mongoose.model('User', userSchema);