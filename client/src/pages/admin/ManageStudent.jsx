import React, { useState } from "react";
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

import BlockIcon from "@mui/icons-material/Block";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import ArchiveIcon from "@mui/icons-material/Archive";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { toast } from "react-toastify";

const studentsData = [
  {
    id: 1,
    name: "Isaac Appiatu",
    class: "JHS 1",
    age: 12,
    phone: "+233542852186",
    emergencyContact: "Alicia - 0244444444",
    address: "D118, Twifo Praso, New Market",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Scholar Bee",
    class: "JHS 3",
    age: 16,
    phone: "233542852186",
    emergencyContact: "Alicia - 0244444444",
    address: "D118, Twifo Praso, Zongo",
    image: "https://via.placeholder.com/150",
  },
  // Add more students as needed
];

function ManageStudent() {
  const [students, setStudents] = useState(studentsData);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/students/edit-student/${id}`);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleInfo = (id) => {
    navigate(`/students/get-student-info/${id}`);
  };

  const handleSuspend = (id) => {
    // Implement suspend logic here
    toast.success(`Student with ID ${id} has been suspended.`);
    // console.log(`Student with ID ${id} has been suspended.`);
  };

  const handleArchive = (id) => {
    // Implement archive logic here
    toast.success(`Student with ID ${id} has been archived.`);
    // console.log(`Student with ID ${id} has been archived.`);
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
                borderRadius: 5,
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
                  onClick={() => {
                    navigate("/students/add-student");
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
              <Grid container spacing={2}>
                {students.map((student) => (
                  <Grid item xs={12} md={8} key={student.id}>
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
                        padding: 1,
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: 150,
                          height: 150,
                          borderRadius: { xs: "100%", md: 2 },
                        }}
                        image={"/me.jpg"}
                        alt={student.name}
                      />
                      <CardContent
                        sx={{
                          flex: 1,
                          padding: 1,
                          paddingBottom: 0,
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          justifyContent: "space-between",
                          "&:last-child": {
                            paddingBottom: "0px",
                          },
                        }}
                      >
                        <Box>
                          <Typography variant="h5" component="div" gutterBottom>
                            {student.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            ID: {student.id}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Class: {student.class}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Age: {student.age}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Phone: {student.phone}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Emergency Contact: {student.emergencyContact}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Address: {student.address}
                          </Typography>
                        </Box>
                        <Divider sx={{ margin: "25px 0 0 0" }} />
                        <CardActions
                          sx={{
                            paddingBottom: 0,
                            display: "flex",
                            flexDirection: { xs: "row", sm: "column" },
                            // justifyContent: "center",
                            // alignItems:"center"
                          }}
                        >
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEdit(student.id)}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(student.id)}
                              color="secondary"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Info">
                            <IconButton
                              onClick={() => handleInfo(student.id)}
                              color="info"
                            >
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Suspend">
                            <IconButton
                              onClick={() => handleSuspend(student.id)}
                              color="warning"
                            >
                              <PauseCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Archive">
                            <IconButton
                              onClick={() => handleArchive(student.id)}
                              color="default"
                            >
                              <ArchiveIcon />
                            </IconButton>
                          </Tooltip>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {/* {students.map((student) => (
                <Grid item xs={12} key={student.id}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: "center",
                      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                      "&:hover": {
                        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
                      },
                      marginBottom: 2,
                    }}
                  >
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h5" component="div" gutterBottom>
                        {student.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Class: {student.class}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Age: {student.age}
                      </Typography>
                      <CardActions>
                        <IconButton
                          onClick={() => handleEdit(student.id)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(student.id)}
                          color="secondary"
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleInfo(student.id)}
                          color="info"
                        >
                          <InfoIcon />
                        </IconButton>
                      </CardActions>
                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{ width: 150, height: 150 }}
                      image={student.image}
                      alt={student.name}
                    />
                  </Card>
                </Grid>
              ))} */}
            </Box>
          </Grid>
          <Grid item xs={0} md={4}>
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
