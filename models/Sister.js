const mongoose = require('mongoose')

const SisterSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    family: String,
    year: String,
    pledgeclass: String,
    image: String
})

module.exports = SisterSchema