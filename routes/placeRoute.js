const express = require("express");
const router = express.Router();
const placeCtrl = require("../controllers/placeCtrl");

router.get("/", placeCtrl.getAllPlaces);
router.post("/", placeCtrl.addPlace);
router.get("/:id", placeCtrl.getPlaceById);
router.patch("/:id", placeCtrl.updateVisitedStatus);
router.delete("/:id", placeCtrl.deletePlace);
router.put("/:id", placeCtrl.editPlace);

module.exports = router;
