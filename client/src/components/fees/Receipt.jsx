import React, { useRef } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src="/sts-logo.png"
            sx={{ height: 100, width: 100, padding: 0, margin: 0 }}
          />
          <Typography variant="h6">New Paradise Preparatory School</Typography>
          <Typography variant="body1">Official Receipt</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            // flexDirection: "column",
            alignItems: "center",
            gap: 2,
            margin: 1,
          }}
        >
          <Box>
            <Typography variant="body2">
              Payment Date: {receiptData.studentId}
            </Typography>
            <Typography variant="body2">
              Receipt No.: {"4816SDG81D5S4815846N"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">Payment Mode: Cash</Typography>
            <Typography variant="body2">Tranz. ID: 156HS89AF415455</Typography>
          </Box>
          {/* <Box></Box> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            // flexDirection: "column",
            alignItems: "center",
            gap: 2,
            margin: 1,
          }}
        >
          <Box
            sx={{
              textAlign: "right",

              gap: 2,
            }}
          >
            <Typography >Student ID :</Typography>
            <Typography >Student Name :</Typography>
            <Typography >Student Class :</Typography>
            <Typography >Term :</Typography>
            <Typography >Year :</Typography>
          </Box>
          <Box
            sx={{
              fontWeight:"bolder"
            }}
          >
            <Typography >NEPPS50500125</Typography>
            <Typography >Alicia Ama Appiatu</Typography>
            <Typography >Grade 6</Typography>
            <Typography >1</Typography>
            <Typography >2024</Typography>
          </Box>
          {/* <Box></Box> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            margin: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              textAlign: "right",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="body2">Amount Paid :</Typography>
              <Typography variant="body2">Paid By :</Typography>
            </Box>
            <Box
              sx={{
                textAlign: "left",
                // gap: 2,
              }}
            >
              <Typography variant="body2">1000</Typography>
              <Typography variant="body2">Scholar Bee</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              textAlign: "right",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="body2">Signature :</Typography>
              <Typography variant="body2">Received By :</Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                // gap: 2,
              }}
            >
              <Typography variant="body2">
                .......................................
              </Typography>
              <Typography variant="body2">Isaac Appiatu</Typography>
            </Box>
          </Box>
        </Box>
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
