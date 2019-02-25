const mongoose = require('../db/connection')

module.exports = {
    Family: mongoose.model("Family", require('./Family')),
    Sister: mongoose.model("Sister",require("./Sister")),
}