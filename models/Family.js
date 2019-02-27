const mongoose = require('mongoose')
const Sister = require('./Sister')

const FamilySchema = new mongoose.Schema({
    name: String,
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sister'
    }]
})


module.exports = FamilySchema