const { Sister } = require('../models/index')

module.exports = {
    index: function(req,res){
        Sister.find({}).then(sisters => {
            res.render("sister/index", { sisters })
        })
    },
    new: function(req,res){
        res.render("sister/new")
    },
    create: function(req,res){
        const { name, year, pledgeclass } = req.body
        Sister.create({
            name,
            year,
            pledgeclass
        }).then(sister => {
            res.redirect(`/sisters/${name}`)
        })
    },
    show: function(req,res){
        Sister.findOne({ name: req.params.id }).then(sister => {
            res.render("sister/show", { sister })
        })
    },
    edit: function(req,res){
        Sister.findOne({ name: req.params.id }).then(sister => {
            res.render("sister/edit", { sister })
        })
    },
    update: function(req,res){
        //redirect back to updated sister's /sisters/:id page
        res.send("Hello world")
    },
    delete: function(req,res){
        //remove from database
        res.redirect("/sisters")
    }
}