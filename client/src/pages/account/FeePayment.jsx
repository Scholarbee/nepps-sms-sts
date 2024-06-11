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
import React from "react";
import Navbar from "../../components/global/Navbar";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InfoIcon from "@mui/icons-material/Money";

function FeePayment() {
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
            margin: "20px 0",
            // alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            item
            xs={12}
            md={8}
            sx={{
              //   display: "flex",
              //   justifyContent: "center",
              //   margin: "20px 0",
              // alignItems: "center",
              padding: 2,
            }}
          >
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                //   value={firstName}
                id="name"
                label="Name"
                //   onChange={(e) => {
                //     setFirstName(e.target.value);
                //   }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                //   value={firstName}
                id="email"
                label="Email"
                //   onChange={(e) => {
                //     setFirstName(e.target.value);
                //   }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="phone"
                name="phone"
                required
                fullWidth
                //   value={phone}
                id="phone"
                label="Phone"
                //   onChange={(e) => {
                //     setPhone(e.target.value);
                //   }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoComplete="address"
                name="address"
                required
                fullWidth
                //   value={address}
                id="address"
                label="Address"
                //   onChange={(e) => {
                //     setAddress(e.target.value);
                //   }}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                autoComplete="amount"
                name="amount"
                required
                fullWidth
                //   value={amount}
                id="amount"
                label="Amount"
                //   onChange={(e) => {
                //     setAmount(e.target.value);
                //   }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <InputLabel id="demo-simple-select-required-label">
                Date Of Birth
              </InputLabel>
              <Box
                component="input"
                type="date"
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
                  color="success"
                  // onClick={() => {
                  //   navigate(`/accounts/payment/${student.id}`);
                  // }}
                  startIcon={<PaymentIcon />}
                  sx={
                    {
                      // width: { sx: "100%", md: "auto" },
                      // display: "flex",
                      // justifyContent: "flex-start",
                      // marginTop: "15px",
                      // gap: "10px",
                      // flexFlow: 1,
                    }
                  }
                >
                  Make Payment
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  // onClick={() => {
                  //   navigate(`/accounts/bills/${student.id}`);
                  // }}
                  startIcon={<ReceiptIcon />}
                >
                  View Bill
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  // onClick={() => {
                  //   navigate(`/accounts/bills/${student.id}`);
                  // }}
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
