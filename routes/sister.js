const express = require("express")
const router = express.Router()
const sisterController = require("../controllers/sister")

router.get("/", sisterController.index)
router.get("/new", sisterController.new)
router.post("/", sisterController.create)
router.get("/:id", sisterController.show)
router.get("/:id/edit", sisterController.edit)
router.put("/:id", sisterController.update)
router.delete("/:id", sisterController.delete)

module.exports = router