const { getCurrentBill } = require("../controllers/accountController");

const router = require("express").Router();

router.get("/bills/current/:id", getCurrentBill);
// router.get("/", getStudents);

module.exports = router;
