const {
  getCurrentBill,
  GetFeeDetails,
  addPayment,
  addBill,
  removeBill,
} = require("../controllers/accountController");

const router = require("express").Router();

router.get("/bills/current/:id", getCurrentBill);
router.get("/fees", GetFeeDetails);
router.put("/fees/add-payment/:id", addPayment);
router.put("/bills/add-bill/:id", addBill);
router.put("/bills/remove-bill/:id", removeBill);
// router.get("/", getStudents);

module.exports = router;
