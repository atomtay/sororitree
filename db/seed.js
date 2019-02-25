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
                year: 2015,
                pledgeclass: "Alpha Omicron",
            }).then(sister => {
                family.members.push(sister)
            }),

            Sister.create({
                name: "Alison",
                year: 2016,
                pledgeclass: "Alpha Pi",
            }).then(sister => {
                family.members.push(sister)
            }),

            Sister.create({
                name: "Annabelle",
                year: 2017,
                pledgeclass: "Alpha Tau",
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
                name: "Leah",
                year: 2017,
                pledgeclass: "Alpha Sigma"
            }).then(sister => {
                family.members.push(sister)
            }),

            Sister.create({
                name: "Tessa",
                year: 2018,
                pledgeclass: "Alpha Tau"
            }).then(sister => {
                family.members.push(sister)
            }),

            Sister.create({
                name: "Jenna",
                year: 2018,
                pledgeclass: "Alpha Tau"
            }).then(sister => {
                family.members.push(sister)
            }).then(() => {
                family.save(err => console.log(err))
            })
        ])
    })
}))