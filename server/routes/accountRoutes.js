const {
  getCurrentBill,
  GetFeeDetails,
  addPayment,
  addBill,
  removeBill,
  editBill,
  paymentDetails,
} = require("../controllers/accountController");
const { userInfo } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/bills/current/:id", userInfo, getCurrentBill);
router.get("/fees", userInfo, GetFeeDetails);
router.put("/fees/add-payment/:id", userInfo, addPayment);
router.put("/bills/add-bill/:id", userInfo, addBill);
router.put("/bills/remove-bill/:feeId/:billId", userInfo, removeBill);
router.put("/bills/edit-bill/:feeId/:billId", userInfo, editBill);
router.get("/fees/payment-details/:paymentId", userInfo, paymentDetails);
// router.get("/", getStudents);

module.exports = router;
