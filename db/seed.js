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
                family: family.name,
                pledgeclass: "Alpha Omicron"
            }).then(sister => {
                family.members.push(sister)
            })
        ]).then(() => {
            family.save(err => console.log(err))
        })
    })

    Family.create({
        name: "Unicorn"
    }).then(family => {
        Promise.all([
            Sister.create({
                firstname: "Leah",
                lastname: "Kesselman",
                family: family.name,
                pledgeclass: "Alpha Sigma"
            }).then(sister => {
                family.members.push(sister)
            })
        ]).then(() => {
            family.save(err => console.log(err))
        })
    })

    Family.create({
        name: "Dragonfly"
    }).then(family => {
        Promise.all([
            Sister.create({
                firstname: "Paige",
                lastname: "Garlington",
                family: family.name,
                pledgeclass: "Alpha Sigma"
            }).then(sister => {
                family.members.push(sister)
            })
        ]).then(() => {
            family.save(err => console.log(err))
        })
    })

    Family.create({
        name: "Starfish"
    }).then(family => {
        Promise.all([
            Sister.create({
                firstname: "Julia",
                lastname: "Kent",
                family: family.name,
                pledgeclass: "Alpha Rho"
            }).then(sister => {
                family.members.push(sister)
            })
        ]).then(() => {
            family.save(err => console.log(err))
        })
    })

    Family.create({
        name: "Grasshopper"
    }).then(family => {
        Promise.all([
            Sister.create({
                firstname: "Brooke",
                lastname: "Brehm",
                family: family.name,
                pledgeclass: "Alpha Pi"
            }).then(sister => {
                family.members.push(sister)
            })
        ]).then(() => {
            family.save(err => console.log(err))
        })
    })

    Family.create({
        name: "Crane"
    }).then(family => {
        Promise.all([
            Sister.create({
                firstname: "Yuting",
                lastname: "Yang",
                family: family.name,
                pledgeclass: "Alpha Pi"
            }).then(sister => {
                family.members.push(sister)
            })
        ]).then(() => {
            family.save(err => console.log(err))
        })
    })
}))