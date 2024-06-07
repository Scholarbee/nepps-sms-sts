// import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// const pages = ["Home", "Dashboard", "Fees", "Exams", "Attendance"];
const settings = ["Profile", "Change password", "Logout ( Isaac )"];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard");
    // alert("Welcome to your dashboard");
    handleCloseNavMenu();
  };
  const handleFees = (e) => {
    e.preventDefault();
    alert("Fees detail");
    handleCloseNavMenu();
  };
  const handleExam = (e) => {
    e.preventDefault();
    alert("Examination detail");
    handleCloseNavMenu();
  };
  const handleAttendance = (e) => {
    e.preventDefault();
    alert("Attendance details");
    handleCloseNavMenu();
  };

  return (
    <AppBar sx={{ backgroundColor: "darkblue" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleDashboard}>
                <Typography textAlign="center">{"Dashboard"}</Typography>
              </MenuItem>
              <MenuItem onClick={handleFees}>
                <Typography textAlign="center">{"Fees"}</Typography>
              </MenuItem>
              <MenuItem onClick={handleExam}>
                <Typography textAlign="center">{"Examination"}</Typography>
              </MenuItem>
              <MenuItem onClick={handleAttendance}>
                <Typography textAlign="center">{"Attendance"}</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NEPPSOCA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              <Avatar alt="logo" src="/sts-logo2.png" />
            </Button>
            <Button
              onClick={handleDashboard}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {"Dashboard"}
            </Button>
            <Button
              onClick={handleFees}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {"Fees"}
            </Button>
            <Button
              onClick={handleExam}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {"Examination"}
            </Button>
            <Button
              onClick={handleAttendance}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {"Attendance"}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginRight:1
                }}
              >
                <Typography
                  sx={{ padding: 0, margin: 0, fontSize: 10, fontWeight:"bold" }}
                  textAlign="center"
                >
                  Isaac Appiatu
                </Typography>
                <Typography
                  sx={{ padding: 0, margin: 0, fontSize: 8 }}
                  textAlign="center"
                >
                  (Admin)
                </Typography>
              </Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="sts" src="/me.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
