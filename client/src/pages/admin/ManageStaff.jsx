import React, { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import BlockIcon from "@mui/icons-material/Block";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { toast } from "react-toastify";
import { getStaffs, getStudents } from "../../redux/admin/adminAtion";

function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [staffsData, setStaffsData] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  //   const [searchResults, setSearchResults] = useState([]);
  // const [students, setStudents] = useState(studentsData);

  useEffect(() => {
    showStaffs();
  }, []);

  const showStaffs = async () => {
    const { data } = await getStaffs();
    setStaffs(data.staffs);
    setStaffsData(data.staffs);
    console.log(data);
  };

  const handleEdit = (id) => {
    navigate(`/staffs/edit-staff/${id}`);
  };

  const handleDelete = (id) => {
    toast.info(`This action is under review`);
  };

  const handleInfo = (id) => {
    // navigate(`/staffs/get-staff-info/${id}`);
    toast.info(`This action is under review`);
  };

  const handleSuspend = (id) => {
    // Implement suspend logic here
    toast.info(`This action is under review`);
    // console.log(`staff with ID ${id} has been suspended.`);
  };

  const handleArchive = (id) => {
    // Implement archive logic here
    toast.info(`This action is under review`);
    // console.log(`staff with ID ${id} has been archived.`);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = staffsData.filter(
        (staff) =>
          staff.firstName.toLowerCase().includes(query) ||
          staff.surname.toLowerCase().includes(query) ||
          staff.otherName.toLowerCase().includes(query) ||
          staff.user.id.toLowerCase().includes(query) ||
          staff.user.email.toLowerCase().includes(query) ||
          staff.phone.toLowerCase().includes(query)
      );
      setStaffs(results);
    } else {
      setStaffs(staffsData);
    }
  };

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
          <h1>Manage Staffs</h1>
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
                marginBottom: 3,
                backgroundColor: "royalblue",
                borderRadius: 5,
              }}
            >
              <Box sx={{ paddingRight: 5 }}>
                <TextField
                  type="search"
                  variant="outlined"
                  placeholder="Search staff"
                  value={searchQuery}
                  onChange={handleSearch}
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
                  onClick={() => {
                    navigate("/staffs/add-staff");
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                // border: "3px solid darkblue",
                // borderRadius: 5,
                margin: 1,
                // minHeight: 450,
                flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                gap: "10px",
                // padding: "0 20px",
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {staffs.map((staff) => {
                  return (
                    <Grid item xs={12} md={10} key={staff._id}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: "center",
                          boxShadow: "2 8px 20px -12px rgba(0,0,0,0.3)",
                          "&:hover": {
                            boxShadow: "0 16px 70px 1.125px rgba(0,0,0,0.3)",
                          },
                          marginBottom: 1,
                          // padding: 1,
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            margin: { xs: "10px", md: "0px" },
                            width: { xs: "110px", md: "224px" },
                            height: { xs: "110px", md: "224px" },
                            borderRadius: { xs: "100%", md: 0 },
                          }}
                          image={staff.image.url}
                          alt={staff.firstName}
                        />
                        <CardContent
                          sx={{
                            flex: 1,
                            // padding: 2,
                            // paddingBottom: 0,
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            justifyContent: "space-between",
                            "&:last-child": {
                              paddingBottom: "0px",
                            },
                          }}
                        >
                          <Box>
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{
                                color: "black",
                                fontSize: "1.3rem",
                                fontWeight: "bold",
                              }}
                            >
                              {`${staff.firstName} ${staff.otherName} ${staff.surname}`}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              ID: {staff.user.id}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Class: {staff.user.email}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Date Of Birth:{" "}
                              {moment(staff.birthDate).format("MMMM DD, YYYY")}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Age: {calculateAge(staff.birthDate) + " year(s)"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Phone: {staff.phone}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Address: {staff.address}
                            </Typography>
                          </Box>
                          <Divider sx={{ margin: "25px 0 0 0" }} />
                          <CardActions
                            sx={{
                              padding: 0,
                              // paddingBottom: 0,
                              display: "flex",
                              flexDirection: { xs: "row", sm: "column" },
                              // justifyContent: "center",
                              // alignItems:"center"
                            }}
                          >
                            <Tooltip title="Edit">
                              <IconButton
                                onClick={() => handleEdit(staff._id)}
                                color="primary"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() => handleDelete(staff._id)}
                                color="secondary"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Info">
                              <IconButton
                                onClick={() => handleInfo(staff._id)}
                                color="info"
                              >
                                <InfoIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Suspend">
                              <IconButton
                                onClick={() => handleSuspend(staff._id)}
                                color="warning"
                              >
                                <PauseCircleOutlineIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Archive">
                              <IconButton
                                onClick={() => handleArchive(staff._id)}
                                color="default"
                              >
                                <ArchiveIcon />
                              </IconButton>
                            </Tooltip>
                          </CardActions>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={false} md={4}>
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

export default ManageStaff;

const calculateAge = (birthDate) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }
  return age;
};
