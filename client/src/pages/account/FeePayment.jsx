import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InfoIcon from "@mui/icons-material/Money";
import { toast } from "react-toastify";
import { addPayment } from "../../redux/account/accountActions";
import { useNavigate, useParams } from "react-router-dom";

function FeePayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    handleValidation();
  });

  const handleValidation = () => {
    if (!name || !phone || !address || !amount) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const formData = {
    paidBy: name,
    email,
    address,
    amount,
    paymentDate,
    phone,
  };

  const handlePayment = async () => {
    try {
      await addPayment(id, formData);
      toast.success(
        `An amount of ¢${amount} has been paid successfully by ${name}`
      );
      navigate("/accounts");
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleBill = () => {
    toast.success("Hey there, Here is your bill");
  };
  const handleHistory = () => {
    toast.success("Hey there, Here is your payment history");
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
            Fee Payment Form
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
            avatar={<Avatar alt="" src="/me.jpg" />}
            label="Scholar Bee"
            variant="outlined"
          />
          <Chip
            // avatar={<Avatar alt="I D" src="/me1.jpg" />}
            label="ID: NEPPS5051241"
            variant="outlined"
          />
        </Box>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            // margin: "20px 20px",
          }}
        >
          <Grid
            container
            spacing={2}
            item
            xs={12}
            md={8}
            sx={{
              padding: 2,
            }}
          >
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                value={name}
                id="name"
                label="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                value={email}
                id="email"
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="phone"
                name="phone"
                required
                fullWidth
                value={phone}
                id="phone"
                label="Phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="address"
                name="address"
                required
                fullWidth
                value={address}
                id="address"
                label="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                autoComplete="amount"
                name="amount"
                required
                fullWidth
                value={amount}
                id="amount"
                label="Amount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <InputLabel id="demo-simple-select-required-label">
                Payment Date
              </InputLabel>
              <Box
                component="input"
                type="date"
                value={paymentDate}
                onChange={(e) => {
                  setPaymentDate(e.target.value);
                }}
                // label="Date"
                sx={{
                  padding: "10px 10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
              />
            </Grid>
            <Divider sx={{ marginY: "15px" }} />
            <Grid item xs={12} sm={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { xs: "center", md: "flex-start" },
                  marginTop: "15px",
                  gap: "10px",
                  flexFlow: 1,
                }}
              >
                <Button
                  variant="contained"
                  disabled={active}
                  color="success"
                  onClick={handlePayment}
                  startIcon={<PaymentIcon />}
                >
                  Make Payment
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleBill}
                  startIcon={<ReceiptIcon />}
                >
                  View Bill
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleHistory}
                  startIcon={<InfoIcon />}
                >
                  Payment History
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </section>
    </>
  );
}

export default FeePayment;
