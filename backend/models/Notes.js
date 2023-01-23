const mongoose = require("mongoose");

const notesschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,               //linking order collection with user collection
        ref: 'user',
        required: true
    },
    name: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true,
    },
    tag: {   
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Notes = new mongoose.model("Notes", notesschema);
module.exports = Notes;