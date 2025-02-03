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
const { userInfo } = require("../middlewares/authMiddleware");

const Multer = require("multer");
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

const router = require("express").Router();

router.post(
  "/add-staff/:clientToken",
  userInfo,
  upload.single("my_file"),
  addStaff
);
router.put(
  "/edit-staff/:id/:clientToken",
  userInfo,
  upload.single("my_file"),
  editStaff
);
router.delete("/delete-staff/:id/:clientToken", userInfo, deleteStaff);
router.put("/suspend-staff/:id/:clientToken", userInfo, suspendStaff);
router.put("/activate-staff/:id/:clientToken", userInfo, activateStaff);
router.put("/archive-staff/:id/:clientToken", userInfo, archiveStaff);
router.get("/staff/:id", getStaff);
router.get("/", getStaffs);

module.exports = router;
