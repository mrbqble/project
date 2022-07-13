const {Schema, model} = require("mongoose");

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    dateOfBirth: {type: String},
    country: {type: String},
    city: {type: String},
    affiliation: {type: String},
    grade: {type: String},
    phoneNumber: {type: String},
    instagram: {type: String},
    telegram: {type: String},
    volunteeringHours: {type: Number}
});

module.exports = model('User', User);