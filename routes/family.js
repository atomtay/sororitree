const express = require("express")
const router = express.Router()
const familyController = require("../controllers/family")

router.get("/", familyController.index)
router.get("/:id", familyController.show)
router.get("/:id/edit", familyController.edit)
router.put("/:id", familyController.update)

module.exports = router