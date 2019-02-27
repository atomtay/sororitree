const mongoose = require('mongoose')

const SisterSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    family: String,
    year: String,
    pledgeclass: String,
    big: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sister'
    }]
})

module.exports = SisterSchema