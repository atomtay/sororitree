const { Family, Sister } = require("../models/index")
    
Family.deleteMany({}).then(
    Sister.deleteMany({}).then(function(){
    Family.create({
        name: "Stardust"
    }).then(family => {
        Promise.all([
            Sister.create({
                firstname: "Morgan",
                lastname: "Mehring",
                family: family.name
            }).then(sister => {
                family.members.push(sister)
            })
        ]).then(() => {
            family.save(err => console.log(err))
        })
    })
}))