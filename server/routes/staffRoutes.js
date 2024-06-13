const {
  addStaff,
  editStaff,
  deleteStaff,
  suspendStaff,
  activateStaff,
  archiveStaff,
  getStaff,
  getStaffs,
} = require("../controllers/staffController");

const router = require("express").Router();

router.post("/add-staff", addStaff);
router.put("/edit-staff/:id", editStaff);
router.delete("/delete-staff/:id", deleteStaff);
router.put("/suspend-staff/:id", suspendStaff);
router.put("/activate-staff/:id", activateStaff);
router.put("/archive-staff/:id", archiveStaff);
router.get("/get-staff/:id", getStaff);
router.get("/get-staffs", getStaffs);

module.exports = router;
