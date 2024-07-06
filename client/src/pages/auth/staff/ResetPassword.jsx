import {
  Avatar,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../../redux/auth/authActions";
import { ClipLoader } from "react-spinners";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const changePassword = async (e) => {
    e.preventDefault();

    if (!password || !password2) {
      return toast.error("Please all fields are required.");
    }
    if (password !== password2) {
      return toast.error("Password mismatch");
    }

    const data = { password, password2 };

    try {
      await resetPassword(data, resetToken);
      navigate("/staff/login");
      toast("Password reset successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div
        style={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Card
          sx={{
            maxWidth: 500,
            margin: "auto",
            marginTop: "15vh",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              p: 5,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "darkblue" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              gutterBottom
              marginBottom={2}
              alignContent={"center"}
              variant="h6"
              component="div"
              color={"darkblue"}
            >
              Reset Password
            </Typography>
            <Stack spacing={3} width={100 + "%"}>
              <TextField
                id="newpassword"
                label="New Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="new-password"
                variant="standard"
              />
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                autoComplete="confirm-password"
                variant="standard"
              />
              <Button
                // href="/login"
                variant="contained"
                disabled={loading}
                onClick={changePassword}
              >
                {loading && <ClipLoader size={20} color="white" />}
                Submit
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ResetPassword;
