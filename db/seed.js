const { Family, Sister } = require("../models/index")
    
Family.deleteMany({}).then(
    Sister.deleteMany({}).then(function(){
    Family.create({
        name: "Stardust"
    }).then(family => {
        Promise.all([
            Sister.create({
                firstname: "Morgan",
                family: family.name
            }).then(sister => {
                console.log("Sister info: " + sister)
                family.members.push(sister)
                console.log("Family info: " + family)
            })
        ]).then(() => {
            family.save(err => console.log(err))
        })
    })
}))