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

const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.post("/add-student", upload.single("my_file"), addStudent);
router.put("/edit-student/:id", upload.single("my_file"), editStudent);
router.delete("/delete-student/:id", deleteStudent);
router.put("/suspend-student/:id", suspendStudent);
router.put("/activate-student/:id", activateStudent);
router.put("/archive-student/:id", archiveStudent);
router.get("/student/:id", getStudent);
router.get("/", getStudents);

module.exports = router;
