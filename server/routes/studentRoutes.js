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

const router = require("express").Router();

router.post("/add-student", addStudent);
router.put("/edit-student/:id", editStudent);
router.delete("/delete-student/:id", deleteStudent);
router.put("/suspend-student/:id", suspendStudent);
router.put("/activate-student/:id", activateStudent);
router.put("/archive-student/:id", archiveStudent);
router.get("/get-student/:id", getStudent);
router.get("/get-students", getStudents);

module.exports = router;
