const {Schema, model} = require("mongoose");

const Event = new Schema({
    time: {type: String},
    date: {type: String},
    text: {type: String},
    type: {type: String},
    title: {type: String},
    image: {type: String},
    hours: {type: Number},
    places: {type: Number},
    subtext: {type: String},
    attended: {type: Array},
    subtitle: {type: String},
    location: {type: String},
    coordinator: {type: String}
});

module.exports = model('Event', Event);