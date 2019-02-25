const { Family } = require('../models/index')

module.exports = {
    index: function(req,res){
        Family.find({}).then(families => {
            res.render("family/index", { families })
        })
    },
    show: function(req,res){
        Family.findOne({ name: req.params.id }).then(family => {
            res.render("family/show", { family })
        })
    },
    edit: function(req,res){
        Family.findOne({ name: req.params.id }).then(family => {
            res.render("family/edit", { family })
        })
    },
    update: function(req,res){
        //redirect back to that family's /family/:id page
        res.send("Hello world")
    },
}