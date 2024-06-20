const { getCurrentBill, GetFeeDetails, addPayment } = require("../controllers/accountController");

const router = require("express").Router();

router.get("/bills/current/:id", getCurrentBill);
router.get("/fees", GetFeeDetails);
router.put("/fees/add-payment/:id", addPayment);
// router.get("/", getStudents);

module.exports = router;
