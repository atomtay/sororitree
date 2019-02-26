const mongoose = require('mongoose')

const SisterSchema = new mongoose.Schema({
    name: String,
    family: String
})

module.exports = SisterSchema