const router = require("express").Router();
const {
  addStudent,
  editStudent,
  deleteStudent,
  suspendStudent,
  activateStudent,
  archiveStudent,
  getStudent,
  getStudents,
} = require("../controllers/studentController");
const { userInfo } = require("../middlewares/authMiddleware");

const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.post(
  "/add-student/:clientToken",
  userInfo,
  upload.single("my_file"),
  addStudent
);
router.put(
  "/edit-student/:id/:clientToken",
  userInfo,
  upload.single("my_file"),
  editStudent
);
router.delete("/delete-student/:id/:clientToken", userInfo, deleteStudent);
router.put("/suspend-student/:id/:clientToken", userInfo, suspendStudent);
router.put("/activate-student/:id/:clientToken", userInfo, activateStudent);
router.put("/archive-student/:id/:clientToken", userInfo, archiveStudent);
router.get("/student/:id", getStudent);
router.get("/", getStudents);

module.exports = router;
