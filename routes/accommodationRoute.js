const express = require("express");
const router = express.Router();
const accommodationCtrl = require("../controllers/accommodationCtrl");

router.get("/", accommodationCtrl.getAllAccommodations);
router.post("/", accommodationCtrl.addAccommodation);
router.get("/:id", accommodationCtrl.getAccommodationById);
router.patch("/:id/stayed", accommodationCtrl.updateStayedStatus);
router.delete("/:id", accommodationCtrl.deleteAccommodation);
router.put("/:id", accommodationCtrl.editAccommodation);

module.exports = router;
