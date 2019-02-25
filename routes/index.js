const express = require("express")
const router = express.Router()

router.get("/", function(req,res){
    res.send("Hello world")
})

router.use("/sisters", require("./sister"))
router.use("/families", require("./family"))

module.exports = router