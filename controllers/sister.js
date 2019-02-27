const { Family, Sister } = require("../models/index")

module.exports = {
    index: function(req,res){
        Sister.find({}).then(sisters => {
            res.render("sister/index", { sisters })
        })
    },
    new: function(req,res){
        Family.find({}).then( families => {
            res.render("sister/new", { families })
        })
    },
    create: function(req,res){
        const { firstname, lastname, year, pledgeclass, family } = req.body
        Family.findOne({ name: family}).then(sisfamily => {
            console.log(sisfamily)
            Promise.all([
                Sister.create({
                    firstname,
                    lastname,
                    year,
                    pledgeclass,
                    sisfamily
                }).then(sister => {
                    sisfamily.members.push(sister)
                })
            ]).then(() => {
                sisfamily.save(err => console.log(err))
                res.redirect("/")
            })
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
            const family = sister.family
            const sisterId = sister._id
            Family.findOneAndUpdate({name: family}, {$pull: {members: {_id: sisterId}}}).then(() => {
                res.redirect("/sisters")
            })
        })
    }
}