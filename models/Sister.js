const mongoose = require('mongoose')

const SisterSchema = new mongoose.Schema({
    name: String,
    year: Number,
    pledgeclass: String,
    big: ObjectID,
    littles: [ObjectID]
})

module.exports = SisterSchema