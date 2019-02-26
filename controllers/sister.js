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
            res.redirect(`/sisters/${sister.id}`)
        })
    },
    show: function(req,res){
        Sister.findById( req.params.id ).then(sister => {
            res.render("sister/show", { sister })
        })
    },
    edit: function(req,res){
        Sister.findById( req.params.id ).then(sister => {
            res.render("sister/edit", { sister })
        })
    },
    update: function(req,res){
        const { name, year, pledgeclass } = req.body
        Sister.findByIdAndUpdate(
            req.params.id,
            {
                name,
                year,
                pledgeclass
            }).then(() =>{
            res.redirect(`/sisters/${req.params.id}`)
        })
        .catch(err => {
            console.log(err);
        })
    },
    delete: function(req,res){
        Sister.findByIdAndDelete( req.params.id ).then((sister) =>{
            console.log(sister)
            res.redirect("/sisters")
        })
    }
}