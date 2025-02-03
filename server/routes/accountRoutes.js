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

router.get("/bills/current/:id/:clientToken", userInfo, getCurrentBill);
router.get("/fee/:clientToken", userInfo, GetFeeDetail);
router.get("/fees/:clientToken", userInfo, GetFeeDetails);
router.put("/fees/add-payment/:id/:clientToken", userInfo, addPayment);
router.put("/bills/add-bill/:id/:clientToken", userInfo, addBill);
router.put(
  "/bills/remove-bill/:feeId/:billId/:clientToken",
  userInfo,
  removeBill
);
router.put("/bills/edit-bill/:feeId/:billId/:clientToken", userInfo, editBill);
router.get(
  "/fees/payment-details/:paymentId/:clientToken",
  userInfo,
  paymentDetails
);
router.patch(
  "/fees/close-term-account/:clientToken",
  userInfo,
  closeTermAccount
);
router.get("/grandtotal/:clientToken", userInfo, groundTotal);
router.get("/yearly-payment/:clientToken", userInfo, sumYearlyPayments);
// router.get("/", getStudents);

module.exports = router;
