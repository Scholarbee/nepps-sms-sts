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

const Multer = require("multer");
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

const router = require("express").Router();

router.post("/add-staff", upload.single("my_file"), addStaff);
router.put("/edit-staff/:id", upload.single("my_file"), editStaff);
router.delete("/delete-staff/:id", deleteStaff);
router.put("/suspend-staff/:id", suspendStaff);
router.put("/activate-staff/:id", activateStaff);
router.put("/archive-staff/:id", archiveStaff);
router.get("/staff/:id", getStaff);
router.get("/", getStaffs);

module.exports = router;
