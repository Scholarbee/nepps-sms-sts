// import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, SET_TOKEN, selectUser } from "../../redux/auth/authSlice";
import { logoutUser } from "../../redux/auth/authActions";
import useRedirectLoggedOutUser from "../../services/useRedirectLoggedOutUser";

const Navbar = () => {
  useRedirectLoggedOutUser("/");

  const userInfo = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogOutUser = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    dispatch(SET_TOKEN(""));
    setTimeout(() => {
      navigate("/");
    }, 300);
    handleCloseNavMenu();
  };
  const handleChangePassword = async () => {
    handleCloseNavMenu();
    setTimeout(() => {
      navigate("/change-password");
    }, 300);
  };
  const handleProfile = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    setTimeout(() => {
      navigate("/");
    }, 300);
    handleCloseNavMenu();
  };

  const settings = [
    { title: "Profile", action: handleCloseNavMenu },
    { title: "Change password", action: handleChangePassword },
    { title: "Logout", action: handleLogOutUser },
  ];

  return (
    <AppBar sx={{ backgroundColor: "darkblue" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleNavigation("/dashboard")}>
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              {userInfo.role === "ceo" &&
                ceoItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    onClick={handleNavigation(item.path)}
                  >
                    <Typography textAlign="center">{item.text}</Typography>
                  </MenuItem>
                ))}
              {(userInfo.role === "admin" || userInfo.role === "ceo") &&
                adminItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    onClick={handleNavigation(item.path)}
                  >
                    <Typography textAlign="center">{item.text}</Typography>
                  </MenuItem>
                ))}
              {userInfo.role === "teacher" &&
                teacherItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    onClick={handleNavigation(item.path)}
                  >
                    <Typography textAlign="center">{item.text}</Typography>
                  </MenuItem>
                ))}
              {userInfo.role === "student" &&
                studentItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    onClick={handleNavigation(item.path)}
                  >
                    <Typography textAlign="center">{item.text}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
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
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NEPPSOCA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button onClick={() => navigate("/")}>
              <Avatar alt="logo" src="/sts-logo2.png" />
            </Button>
            <Button
              onClick={handleNavigation("/dashboard")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Dashboard
            </Button>
            {(userInfo.role === "ceo" || userInfo.role === "ceo") &&
              ceoItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={handleNavigation(item.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.text}
                </Button>
              ))}
            {(userInfo.role === "admin" || userInfo.role === "ceo") &&
              adminItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={handleNavigation(item.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.text}
                </Button>
              ))}
            {userInfo.role === "teacher" &&
              teacherItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={handleNavigation(item.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.text}
                </Button>
              ))}
            {userInfo.role === "student" &&
              studentItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={handleNavigation(item.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item.text}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginRight: 1,
                }}
              >
                <Typography
                  sx={{
                    padding: 0,
                    margin: 0,
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                  textAlign="center"
                >
                  {`${userInfo.firstName} ${userInfo.surname}`}
                </Typography>
                <Typography
                  sx={{ padding: 0, margin: 0, fontSize: 8 }}
                  textAlign="center"
                >
                  ({userInfo.role})
                </Typography>
              </Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="sts" src={userInfo.photo} />
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
                <MenuItem key={setting.title} onClick={setting.action}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

const adminItems = [
  { text: "Manage Students", path: "/students" },
  { text: "Manage Staffs", path: "/staffs" },
  { text: "Manage Fees", path: "/accounts" },
  { text: "Manage Class", path: "/classes" },
  { text: "Subjects", path: "/subjects" },
];
const ceoItems = [
  { text: "Fees Report", path: "/fees-report" },
  // { text: "Manage Staffs", path: "/staffs" },
  // { text: "Manage Fees", path: "/accounts" },
  // { text: "Manage Class", path: "/classes" },
  // { text: "Manage Users", path: "/classes" },
];

const teacherItems = [
  { text: "Examination", path: "/exams" },
  { text: "Attendance", path: "/attendance" },
];
const studentItems = [
  { text: "Fees", path: "/student/fees" },
  { text: "Examination", path: "/exams" },
  { text: "Attendance", path: "/attendance" },
];
