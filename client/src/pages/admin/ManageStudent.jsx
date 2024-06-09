import React from "react";
import Navbar from "../../components/global/Navbar";
import { Box, Button, TextField, InputAdornment, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function ManageStudent() {
  const navigate = useNavigate()
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
          <h1>Manage Student</h1>
        </Box>
        <Grid container spacing={2} sx={{ padding: "0 20px" }}>
          <Grid item xs={12} md={8} rowSpacing={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "space-between", sm: "space-around" },
                alignItems: "center",
                // gap: "10px",
                padding: "10px 20px",
                backgroundColor: "royalblue",
                borderRadius:5
              }}
            >
              <Box sx={{ paddingRight: 5 }}>
                <TextField
                  type="search"
                  variant="outlined"
                  placeholder="Search student"
                  sx={{ width: { xs: "100%", sm: "300px" } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                  onClick={()=>{navigate("/students/add-student");}}
                >
                  Add
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                border: "3px solid darkblue",
                borderRadius: 5,
                margin: 1,
                minHeight: 450,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // gap: "10px",
                padding: "0 20px",
              }}
            >
              <h3>Student List</h3>
              <p>The list of student will appears here</p>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                padding: "20px",
                display: "flex",
                border: "3px solid darkblue",
                borderRadius: 5,
                margin: 1,
                minHeight: 500,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // gap: "10px",
              }}
            >
              <h1>Class Stats</h1>
              <p>
                Class stats will contain each class and the number of students
                in the class
              </p>
            </Box>
          </Grid>
        </Grid>
      </section>
    </>
  );
}

export default ManageStudent;
