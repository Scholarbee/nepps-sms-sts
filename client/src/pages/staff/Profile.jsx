import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";

function Profile() {
  const profile = {
    name: "John Doe",
    designation: "Mathematics Teacher",
    email: "johndoe@example.com",
  };
  return (
    <Grid item xs={12} md={4}>
      <Paper
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ width: 80, height: 80 }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {profile.name}
        </Typography>
        <Typography variant="subtitle1">{profile.designation}</Typography>
        <Typography variant="body2">{profile.email}</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Edit Profile
        </Button>
      </Paper>
    </Grid>
  );
}

export default Profile;
