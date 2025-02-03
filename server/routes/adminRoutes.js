const {
  addClass,
  editClass,
  deleteClass,
  getClass,
  getClasses,
  getStudentCounts,
  getSubjects,
  addSubject,
  editSubject,
} = require("../controllers/adminController");
const { userInfo } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/classes/add-class/:clientToken", userInfo, addClass);
router.put("/classes/edit-class/:id/:clientToken", userInfo, editClass);
router.delete("/classes/delete-class/:id/:clientToken", userInfo, deleteClass);
// router.put("/suspend-class/:id/:clientToken",userInfo, suspendclass);
// router.put("/activate-class/:id/:clientToken",userInfo, activateclass);
// router.put("/archive-class/:id/:clientToken",userInfo, archiveclass);
router.get("/class/:id", getClass);
router.get("/classes", getClasses);
router.get("/classes/students", getStudentCounts);

// router.get("/subject/:id", getClass);
router.get("/subjects", getSubjects);
router.post("/subjects/add-subject/:clientToken", userInfo, addSubject);
router.put("/subjects/edit-subject/:id/:clientToken", userInfo, editSubject);

module.exports = router;
