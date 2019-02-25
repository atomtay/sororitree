const mongoose = require('mongoose')

const SisterSchema = new mongoose.Schema({
    name: String,
    year: Number,
    pledgeclass: String,
    big: mongoose.Schema.Types.ObjectId,
    littles: [mongoose.Schema.Types.ObjectId]
})

module.exports = SisterSchema