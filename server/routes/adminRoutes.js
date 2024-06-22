const {
  addClass,
  editClass,
  deleteClass,
  getClass,
  getClasses,
  getStudentCounts,
} = require("../controllers/adminController");



const router = require("express").Router();

router.post("/classes/add-class", addClass);
router.put("/classes/edit-class/:id", editClass);
router.delete("/classes/delete-class/:id", deleteClass);
// router.put("/suspend-class/:id", suspendclass);
// router.put("/activate-class/:id", activateclass);
// router.put("/archive-class/:id", archiveclass);
router.get("/class/:id", getClass);
router.get("/classes", getClasses);
router.get("/classes/students", getStudentCounts);

module.exports = router;
