const {
  getCurrentBill,
  GetFeeDetails,
  addPayment,
  addBill,
  removeBill,
  editBill,
  paymentDetails,
} = require("../controllers/accountController");

const router = require("express").Router();

router.get("/bills/current/:id", getCurrentBill);
router.get("/fees", GetFeeDetails);
router.put("/fees/add-payment/:id", addPayment);
router.put("/bills/add-bill/:id", addBill);
router.put("/bills/remove-bill/:feeId/:billId", removeBill);
router.put("/bills/edit-bill/:feeId/:billId", editBill);
router.get("/fees/payment-details/:paymentId", paymentDetails);
// router.get("/", getStudents);

module.exports = router;
