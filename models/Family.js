const mongoose = require('mongoose')
const Sister = require('./sister')

const FamilySchema = new mongoose.Schema({
    name: String,
    members: [Sister]
})

module.exports = FamilySchema