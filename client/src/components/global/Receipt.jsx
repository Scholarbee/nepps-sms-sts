import React, { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";

const Receipt = ({ receiptData }) => {
  const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: "Receipt",
  });

  return (
    <Box>
      <Box
        ref={receiptRef}
        sx={{
          padding: 2,
          border: "1px solid #ddd",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Receipt
        </Typography>
        <Typography variant="body1">
          Student ID: {receiptData.studentId}
        </Typography>
        <Typography variant="body1">Name: {receiptData.name}</Typography>
        <Typography variant="body1">Class: {receiptData.className}</Typography>
        <Typography variant="body1">Term: {receiptData.term}</Typography>
        <Typography variant="body1">Year: {receiptData.year}</Typography>
        <Typography variant="body1">
          Amount Owing: {receiptData.amountOwing}
        </Typography>
        <Typography variant="body1">
          Total Paid: {receiptData.totalPaid}
        </Typography>
        <Typography variant="body1">
          Current Fees: {receiptData.currentFees}
        </Typography>
        <Typography variant="body1">
          Amount to Be Paid: {receiptData.amountToBePaid}
        </Typography>
      </Box>
      <Button
        onClick={handlePrint}
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Print Receipt
      </Button>
    </Box>
  );
};

export default Receipt;
