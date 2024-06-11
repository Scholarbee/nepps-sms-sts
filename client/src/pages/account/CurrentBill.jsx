import React from 'react'
import Navbar from '../../components/global/Navbar';
import { Box, Typography } from '@mui/material';

function CurrentBill() {
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
          <Typography variant="h4" sx={{ color: "darkblue", fontWeight:"bolder" }}>
            Current Bill
          </Typography>
        </Box>
      </section>
    </>
  );
}

export default CurrentBill