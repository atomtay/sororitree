const { Family } = require('../models/index')
const { Sister } = require("../models/index")

module.exports = {
    index: function(req,res){
        Family.find({}).then(families => {
            res.render("family/index", { families })
        })
    },
    new: function(req,res){
        res.render("family/new")
    },
    create: function(req,res){
        const { name } = req.body
        Family.create({
            name
        }).then(family => {
            res.redirect(`/families/${family._id}`)
        })
    },
    show: function(req,res){
        Family.findById( req.params.id ).then(family => {
            res.render("family/show", { family })
        })
    },
    edit: function(req,res){
        Family.findById( req.params.id ).then(family => {
            res.render("family/edit", { family })
        })
    },
    update: function(req,res){
        const { name } = req.body
        Family.findByIdAndUpdate(
            req.params.id,
            {name},
            {new: true}
        ).then((family) => {
            for (i = 0; i < family['members'].length; i++){
                console.log(family['members'][i]["_id"])
                console.log(family.name)
                Sister.findByIdAndUpdate(family['members'][i]["_id"], { family: family.name }, {new: true}).then((sister) => {
                    console.log(sister)
                })
                //family['members'][i]['family'] = family['name']
            }
            res.redirect(`/families/${req.params.id}`)
        }).catch(err => {
            console.log(err);
        })
    },
}