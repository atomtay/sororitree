const express = require("express")
const router = express.Router()

router.get("/", function(req,res){
    res.render('index')
})

router.use("/sisters", require("./sister"))
router.use("/families", require("./family"))

module.exports = router