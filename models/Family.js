const mongoose = require('mongoose')
const Sister = require('./Sister')

const FamilySchema = new mongoose.Schema({
    name: String,
    members: []
})

module.exports = FamilySchema