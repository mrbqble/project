const {Schema, model} = require("mongoose");

const Event = new Schema({
    day: {type: String},
    text: {type: String},
    title: {type: String},
    month: {type: String},
    image: {type: String},
    hours: {type: Number},
    places: {type: Number},
    subtext: {type: String},
    attended: {type: Array},
    subtitle: {type: String}
});

module.exports = model('Event', Event);