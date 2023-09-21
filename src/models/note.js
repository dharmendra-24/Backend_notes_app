const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    userid: {
        type: String,
        require: true,
    },
    title: {
        type: String,
    },
    content: {
        type: String
    },
    dateadded: {
        type: Date,
        // default: Date.now()
    }



})
module.exports = mongoose.model("Notes", noteSchema);