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
        Family.findOne({ name: family}).then((familyToUpdate) => {
            Sister.findById(big).then((big) => {
                if (big.little && big.little.length >= 1){
                    const message = true
                    Sister.find({}).then(sisters => {
                        Family.find({}).then( families => {
                            res.render("sister/new", { sisters, families,message })
                        })
                    })
                }
                else{
                    Sister.create({firstname,lastname,year,pledgeclass,family,big})
                    .then(littlesister => {
                        Sister.findByIdAndUpdate(littlesister['big'], {$push: {little: littlesister['_id']}})
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
                Sister.findById(sister.little).then(little => {
                     res.render("sister/show", { sister, big, little })
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
        then(() =>{
            res.redirect(`/sisters/${req.params.id}`)
        })
        .catch(err => {
            console.log(err);
        })
    },

    delete: function(req,res){
        Sister.findByIdAndDelete( req.params.id )
        .then(sister => {
            Sister.findByIdAndUpdate(sister.big, {little: sister.little})
            .then(() => {
                Sister.findByIdAndUpdate(sister.little, {big: sister.big})
                .then(() => {
                    Family.findOneAndUpdate({name: sister.family}, {$pull: {members: {_id: sister._id}}})
                    .then(() => {
                        res.redirect("/sisters")
                    })
                })
            })
        })
    }
}