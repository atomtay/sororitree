const { Family } = require('../models/index')

module.exports = {
    index: function(req,res){
        res.render("family/index")
    },
    show: function(req,res){
        res.render("family/show")
    },
    edit: function(req,res){
        res.render("family/edit")
    },
    update: function(req,res){
        //redirect back to that family's /family/:id page
        res.send("Hello world")
    },
}