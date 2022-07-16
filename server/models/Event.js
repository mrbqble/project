const {Schema, model} = require("mongoose");

const Event = new Schema({
    title: {type: String},
    subtitle: {type: String},
    text: {type: String},
    subtext: {type: String},
    month: {type: String},
    day: {type: String},
    image: {type: String}
});

module.exports = model('Event', Event);