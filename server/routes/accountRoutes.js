const {
  getCurrentBill,
  GetFeeDetails,
  addPayment,
  addBill,
  removeBill,
  editBill,
  paymentDetails,
  closeTermAccount,
  GetFeeDetail,
  groundTotal,
  sumYearlyPayments,
} = require("../controllers/accountController");
const { userInfo } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/bills/current/:id", userInfo, getCurrentBill);
router.get("/fee", userInfo, GetFeeDetail);
router.get("/fees", userInfo, GetFeeDetails);
router.put("/fees/add-payment/:id", userInfo, addPayment);
router.put("/bills/add-bill/:id", userInfo, addBill);
router.put("/bills/remove-bill/:feeId/:billId", userInfo, removeBill);
router.put("/bills/edit-bill/:feeId/:billId", userInfo, editBill);
router.get("/fees/payment-details/:paymentId", userInfo, paymentDetails);
router.patch("/fees/close-term-account", userInfo, closeTermAccount);
router.get("/grandtotal", groundTotal);
router.get("/yearly-payment", sumYearlyPayments);
// router.get("/", getStudents);

module.exports = router;
