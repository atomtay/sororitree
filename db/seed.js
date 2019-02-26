const { Family } = require("../models/index")
const { Sister } = require("../models/index")
    
Family.deleteMany({}).then(
    Sister.deleteMany({}).then(function(){
    Family.create({
        name: "Stardust"
    }).then(family => {
        Promise.all([
            Sister.create({
                name: "Morgan",
                family: family.name
            }).then(sister => {
                family.members.push(sister)
            }),

            Sister.create({
                name: "Alison",
                family: family.name
            }).then(sister => {
                family.members.push(sister)
            }),
            
            Sister.create({
                name: "Annabelle",
                family: family.name
            }).then(sister => {
                family.members.push(sister)
            })
        ]).then(() => {
            family.save(err => console.log(err))
        })
    })
}))