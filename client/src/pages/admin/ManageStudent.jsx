import React from "react";
import Navbar from "../../components/global/Navbar";
import { Box, Button, TextField, InputAdornment, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

function ManageStudent() {
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} rowSpacing={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent:{ xs: "space-between", sm: "space-around" },
                alignItems: "center",
                // gap: "10px",
                padding: "0 20px",
              }}
            >
              <Box sx={{paddingRight:5}}>
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
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            Class Stats
          </Grid>
        </Grid>
      </section>
    </>
  );
}

export default ManageStudent;
