const { Family, Sister } = require("../models/index")

module.exports = {
    index: function(req,res){
        Sister.find({}, null, {sort: {lastname: 1}}).then(sisters => {
            Family.find({}).then(families => {
                res.render("sister/index", { sisters, families })
            })
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
        console.log(big == true)
        Family.findOne({ name: family}).then((familyToUpdate) => {
            Sister.findById(big).then((big) => {
                if (big.littles.length >= 2){
                    console.log("trouble!")
                    res.redirect("/")
                }
                else{
                    Sister.create({firstname,lastname,year,pledgeclass,family,big})
                    .then(littlesister => {
                        Sister.findByIdAndUpdate(littlesister['big'], {$push: {littles: littlesister['_id']}})
                        .then(() => {
                            familyToUpdate.members.push(littlesister)
                            res.redirect(`/sisters/${littlesister._id}`)
                            familyToUpdate.save(err => console.log(err))
                        })
                    })
                }
            })
        })
    },

    show: function(req,res){
        Sister.findById( req.params.id ).then(sister => {
            Sister.findById(sister.big).then(big => {
                Sister.find({_id: {$in: sister.littles}}).then(littles => {
                     res.render("sister/show", { sister, big, littles })
                 });
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
        const { firstname, lastname, year, pledgeclass } = req.body
        Sister.findByIdAndUpdate(req.params.id, {firstname,lastname,year,pledgeclass},{new: true}).
        then((sister) =>{
            console.log(sister)
            res.redirect(`/sisters/${req.params.id}`)
        })
        .catch(err => {
            console.log(err);
        })
    },

    delete: function(req,res){
        Sister.findByIdAndDelete( req.params.id ).then(sister =>{
            Sister.findByIdAndUpdate(sister.big, {littles: sister.littles}).then(() => {
                Sister.findByIdAndUpdate(sister.littles[0], {big: sister.big}).then(() => {
                    Sister.findByIdAndUpdate(sister.littles[1], {big: sister.big}).then(() => {
                        Family.findOneAndUpdate({name: sister.family}, {$pull: {members: {_id: sister._id}}}).then(() => {
                            res.redirect("/sisters")
                        })
                    })
                })
            })
        })
    }
}