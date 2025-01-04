const express = require("express");
const router = express.Router();
const foodCtrl = require("../controllers/foodCtrl");

router.get("/", foodCtrl.getAllFood);
router.post("/", foodCtrl.addFood);
router.get("/:id", foodCtrl.getFoodById);
router.patch("/:id", foodCtrl.updateAteStatus);
router.delete("/:id", foodCtrl.deleteFood);
router.put("/:id", foodCtrl.editFood);

module.exports = router;
