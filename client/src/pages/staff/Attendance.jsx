import React from "react";
import Navbar from "../../components/global/Navbar";
import { Box } from "@mui/material";

function Attendance() {
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
          <h1>Attendance Management</h1>
        </Box>
      </section>
    </>
  );
}

export default Attendance;
