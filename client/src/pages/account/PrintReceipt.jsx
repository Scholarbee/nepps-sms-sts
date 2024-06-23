// import React from "react";
import { Box, Grid } from "@mui/material";
import Receipt from "../../components/fees/Receipt";
import Navbar from "../../components/global/Navbar";

function PrintReceipt() {
  return (
    <>
      <Navbar />
      <Grid container sx={{display:"flex", justifyContent:"center"}}>
        <Grid item xs={12} md={8}>
          <Box sx={{ padding: 1 }}>
            <Receipt receiptData={receiptData} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default PrintReceipt;

const receiptData = {
  studentId: "12345",
  name: "John Doe",
  className: "Class A",
  term: "1",
  year: "2024",
  amountOwing: 1000,
  totalPaid: 500,
  currentFees: 1500,
  amountToBePaid: 2000,
};
