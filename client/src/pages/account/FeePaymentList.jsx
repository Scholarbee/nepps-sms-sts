import { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import { getCurrentBill } from "../../redux/account/accountActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import Loader from "../../components/global/Loader";

function FeePaymentList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymnets, setPayments] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [studentId, setStudentId] = useState("");
  const [_class, setClass] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    showCurrentBill();
  }, []);

  const showCurrentBill = async () => {
    setLoading(true);
    try {
      const { data } = await getCurrentBill(id);
      // console.log(data.currentBill);
      setPayments(data.currentBill.paymentList);
      setImage(data.currentBill.studentId.image.url);
      setStudentId(data.currentBill.studentId.user.id);
      setClass(data.currentBill.studentId.classId.className);
      setName(
        `${data.currentBill.studentId.firstName} ${data.currentBill.studentId.surname}`
      );
      setLoading(false);
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
          <Chip label={`ID: ${studentId}`} variant="outlined" />
          <Chip label={`Class: ${_class}`} variant="outlined" />
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
                onClick={() => {
                  handleAddPayment();
                }}
              >
                New Payment
              </Button>
            </Box>
            {loading ? <Loader/> : paymnets.length > 0 ? (
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
                            {`${payment.receivedBy.firstName} ${payment.receivedBy.surname}`}
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
    </>
  );
}

export default FeePaymentList;

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
