const mongoose = require('mongoose');

if (process.env.NODE_ENV == "production") {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, function(err) {
        if (err) { return console.log(err);}
      })

} else {
    mongoose.connect("mongodb://localhost/sororitree", {useNewUrlParser: true}, function(err) {
        if (err) { return console.log(err);}
      })
}
mongoose.Promise = Promise

module.exports = mongoose