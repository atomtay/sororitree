const { Family, Sister } = require("../models/index")

module.exports = {
    index: function(req,res){
        Sister.find({}, null, {sort: {lastname: 1}}).then(sisters => {
            res.render("sister/index", {sisters
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
            //Handling any n+1st sister where a Big is assigned
            if (big){
                Sister.findById(big).then((big) => {
                    //Disallow creating a second little for any existing big
                    if (big.little && big.little.length >= 1){
                        const message = true
                        Sister.find({}).then(sisters => {
                            Family.find({}).then( families => {
                                res.render("sister/new", { sisters, families,message })
                            })
                        })
                    }
                    //Attach a little to a big
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
            }
            //Handle creating the first Sister in the database (or when re-populating)
            else {
                console.log("1st: " + familyToUpdate.members)
                Sister.create({firstname,lastname,year,pledgeclass,family})
                .then((littlesister) => {
                    console.log("2nd " +familyToUpdate.members)
                    familyToUpdate.members.push(littlesister)
                    //console.log(familytoUpdate.members.length)
                    res.redirect(`/sisters/${littlesister._id}`)
                })
            }
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
                    console.log(sister.id)
                    Family.findOneAndUpdate({name: sister.family}, {$pull: {members: {id: sister.id}}}, {new: true})
                    .then((family) => {
                        console.log(family.members.length)
                        res.redirect("/sisters")
                    })
                })
            })
        })
    }
}