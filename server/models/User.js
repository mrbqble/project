const {Schema, model} = require("mongoose");

const User = new Schema({
    name: {type: String},
    city: {type: String},
    code: {type: String},
    type: {type: String},
    came: {type: Boolean},
    grade: {type: String},
    country: {type: String},
    telegram: {type: String},
    instagram: {type: String},
    dateOfBirth: {type: String},
    affiliation: {type: String},
    phoneNumber: {type: String},
    volunteeringHours: {type: Number},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true}
});

module.exports = model('User', User);