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
        let sistersList = []
        Family.findById( req.params.id )
        .then(family => {
            for( i = 0; i < family.members.length; i++){
                Sister.findById(family['members'][i]['_id'])
                .then(sister => {
                    sistersList.push(sister)
                    console.log(sistersList)
                })
            }
            console.log("End of FOR LOOP")
        }).then((result) => {
            console.log("Final result")
            console.log(sistersList)
            res.render("family/show", { result })
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
                Sister.findByIdAndUpdate(family['members'][i]["_id"], { family: family.name }, {new: true}).then(() => {
                })
            }
            res.redirect(`/families/${req.params.id}`)
        }).catch(err => {
            console.log(err);
        })
    },
}