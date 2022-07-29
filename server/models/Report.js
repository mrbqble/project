const {Schema, model} = require("mongoose");

const Report = new Schema({
    bags: {type: Number},
    type: {type: String},
    eventid: {type: String, unique: true},
    addinfo: {type: String},
    attended: {type: Array},
    distance: {type: Number},
    coordinator: {type: String}
});

module.exports = model('Report', Report);