import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Navbar from "../../../components/global/Navbar";
import { changePassword } from "../../../redux/auth/authActions";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function ChangePassword() {
  const [oldPassword, setOldpassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await changePassword({ oldPassword, password, password2 });
      toast.success("Password changed successfully.");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <Box sx={{ padding: 2 }}>
        <Card sx={{ maxWidth: 500, height: 420, margin: "5rem auto" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 5,
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              gutterBottom
              marginBottom={2}
              alignContent={"center"}
              variant="h6"
              component="div"
            >
              Change Password
            </Typography>
            <Stack spacing={3} width={100 + "%"}>
              <TextField
                label=" Old Password"
                type="password"
                value={oldPassword}
                variant="standard"
                onChange={(e) => {
                  setOldpassword(e.target.value);
                }}
              />
              <TextField
                label="New Password"
                type="password"
                value={password}
                variant="standard"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                value={password2}
                variant="standard"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
              />

              <Button
                disabled={loading}
                variant="contained"
                onClick={handleChangePassword}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                {loading && <ClipLoader size={20} color="white" />}
                Change Password
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default ChangePassword;
