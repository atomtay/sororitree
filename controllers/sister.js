const { Family, Sister } = require("../models/index")

module.exports = {
    index: function(req,res){
        Sister.find({}).then(sisters => {
            res.render("sister/index", { sisters })
        })
    },
    new: function(req,res){
        Sister.find({}).then(sisters => {
            Family.find({}).then( families => {
                res.render("sister/new", { sisters, families })
            })
        })
    },
    create: function(req,res){
        const { firstname, lastname, year, pledgeclass, family, big } = req.body
        Family.findOne({ name: family}).then(updatedFamily => {
            Promise.all([
                Sister.create({
                    firstname,
                    lastname,
                    year,
                    pledgeclass,
                    family,
                    big
                }).then(sister => {
                    updatedFamily.members.push(sister)
                    res.redirect(`/sisters/${sister._id}`)
                })
            ]).then(() => {
                updatedFamily.save(err => console.log(err))
            })
        })
    },
    show: function(req,res){
        Sister.findById( req.params.id ).then(sister => {
            Sister.findById(sister.big).then(big => {
                res.render("sister/show", { sister, big })
            })
        })
    },
    edit: function(req,res){
        Sister.findById( req.params.id ).then(sister => {
            Family.find({}).then( families => {
                res.render("sister/edit", { sister,families })
            })
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