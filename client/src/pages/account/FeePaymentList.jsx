import { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  addBill,
  delBill,
  editBill,
  getCurrentBill,
} from "../../redux/account/accountActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import Receipt from "../../components/fees/Receipt";

function FeePaymentList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymnets, setPayments] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [studentId, setStudentId] = useState("");
  const [_class, setClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [feeId, setFeeId] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    showCurrentBill();
  }, []);

  const showCurrentBill = async () => {
    try {
      const { data } = await getCurrentBill(id);
      // console.log(data.currentBill);
      setPayments(data.currentBill.paymentList);
      setImage(data.currentBill.studentId.image.url);
      setFeeId(data.currentBill._id);
      setStudentId(data.currentBill.studentId.user.id);
      setClass(data.currentBill.studentId.classId.className);
      setName(
        `${data.currentBill.studentId.firstName} ${data.currentBill.studentId.surname}`
      );
    } catch (error) {
      // console.log(error.response);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleAddPayment = async () => {
    navigate("/accounts/payment/" + id);
  };

  const handlePrintReceipt = async (pid) => {
    navigate("/accounts/print-receipt/" + pid);
  };

  //   const handleDeletePayment = async (billId) => {
  //     setLoading(true);
  //     try {
  //       let con = window.confirm("Please confirm action.");
  //       if (con) {
  //         // await delBill(feeId, billId);
  //         await showCurrentBill();
  //         toast.info("Bill deleted successfully");
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       // console.log(error);
  //       toast.error(error.response.data.message);
  //       setLoading(false);
  //     }
  //   };

  return (
    <>
      <Navbar />
      <section>
        <Box
          sx={{
            padding: "20px",
            margin: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "darkblue", fontWeight: "bolder" }}
          >
            Payment List
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chip
            avatar={<Avatar alt="" src={image} />}
            label={name}
            variant="outlined"
          />
          <Chip
            // avatar={<Avatar alt="I D" src="/me1.jpg" />}
            label={`ID: ${studentId}`}
            variant="outlined"
          />
          <Chip
            // avatar={<Avatar alt="I D" src="/me1.jpg" />}
            label={`Class: ${_class}`}
            variant="outlined"
          />
        </Box>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              padding: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px 0",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                // sx={{ width: { xs: "100%", sm: "auto" } }}
                onClick={() => {
                  handleAddPayment();
                }}
              >
                New
              </Button>
            </Box>
            {paymnets.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Sn</StyledTableCell>
                      <StyledTableCell>Paid By</StyledTableCell>
                      <StyledTableCell>Amount</StyledTableCell>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Received By</StyledTableCell>
                      <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymnets.map((payment, i) => {
                      return (
                        <StyledTableRow key={payment._id}>
                          <StyledTableCell>{i + 1}</StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {payment.paidBy}
                          </StyledTableCell>
                          <StyledTableCell>{payment.amount}</StyledTableCell>
                          <StyledTableCell>
                            {moment(payment.paymentDate).format(
                              "MMMM DD, yyyy"
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            {payment.receivedBy}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Tooltip title="Print">
                              <IconButton
                                onClick={() => {
                                  handlePrintReceipt(payment._id);
                                }}
                                color="primary"
                              >
                                <PrintIcon />
                              </IconButton>
                            </Tooltip>
                            {/* <Tooltip title="Delete">
                            <IconButton
                              disabled={loading}
                              onClick={() => handleDeletePayment(payment._id)}
                              color="secondary"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip> */}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <h1 style={{ textAlign: "center" }}>No payment made.</h1>
            )}
          </Grid>
        </Grid>
      </section>
      {/* <div>
        <Receipt receiptData={receiptData} />
      </div> */}
    </>
  );
}

export default FeePaymentList;

// const receiptData = {
//   studentId: "12345",
//   name: "John Doe",
//   className: "Class A",
//   term: "1",
//   year: "2024",
//   amountOwing: 1000,
//   totalPaid: 500,
//   currentFees: 1500,
//   amountToBePaid: 2000,
// };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
