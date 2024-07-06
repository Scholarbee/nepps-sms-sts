import {
  Avatar,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, validateEmail } from "../../../redux/auth/authActions";
import Navbar from "../../../components/global/Navbar";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Invalid email");
    }

    try {
      setLoading(true);
      await forgotPassword(email);
      toast.success("Mail sent succesfully. Please check your mail for a reset link.");
      // navigate("/staff/reset-password");
      setLoading(false);
      setEmail("")
    } catch (error) {
      setLoading(false);
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
            >
              Forgot Password
            </Typography>
            <Stack spacing={3} width={100 + "%"}>
              <TextField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                variant="standard"
              />
              <Button
                onClick={sendMail}
                variant="contained"
                disabled={loading}
                endIcon={<SendIcon />}
              >
                {loading && <ClipLoader size={20} color="white" />}
                Send reset link
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ForgotPassword;
