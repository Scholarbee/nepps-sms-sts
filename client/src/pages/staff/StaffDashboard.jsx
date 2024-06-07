import React from "react";
import Navbar from "../../components/global/Navbar";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import Footer from "../../components/global/Footer";

function StaffDashboard() {
  // Mock data

  const announcements = [
    { id: 1, text: "School will be closed on July 4th." },
    { id: 2, text: "Parent-teacher meetings will be held on July 10th." },
  ];

  const timetable = [
    { period: "1st", subject: "Mathematics", time: "9:00 AM - 10:00 AM" },
    { period: "2nd", subject: "Science", time: "10:00 AM - 11:00 AM" },
  ];

  const tasks = [
    { id: 1, text: "JHS 3 Exam report", completed: false },
    { id: 2, text: "Prepare lesson plan for next week", completed: true },
  ];

  const students = [
    { name: "Alicia", attendance: "Present" },
    { name: "Peter", attendance: "Absent" },
  ];

  const profile = {
    name: "Scholar Bee",
    designation: "Mathematics Teacher",
    email: "scholars@sts.com",
    photo:"/me.jpg"
  };

  return (
    <>
      <Navbar />
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: "calc(100vh - 64px - 64px)",
          padding: "20px 10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Grid item xs={12} md={12}>
                <Paper
                  sx={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <Avatar
                    src={profile.photo}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {profile.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    {profile.designation}
                  </Typography>
                  <Typography variant="body2">{profile.email}</Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Edit Profile
                  </Button>
                </Paper>
              </Grid>
              {/* Announcements and Notifications */}
              <Grid item xs={12} md={12}>
                <Paper
                  sx={{
                    padding: "20px",
                    color: "whitesmoke",
                    backgroundColor: "#0095ff",
                  }}
                >
                  <Typography variant="h6">
                    Announcements and Notifications
                  </Typography>
                  <List>
                    {announcements.map((announcement) => (
                      <ListItem key={announcement.id}>
                        <ListItemText primary={announcement.text} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              {/* Timetable and Schedule */}
              <Grid item xs={12} md={12}>
                <Paper
                  sx={{
                    padding: "20px",
                    color: "whitesmoke",
                    backgroundColor: "#0095ff",
                  }}
                >
                  <Typography variant="h6">Timetable and Schedule</Typography>
                  <List>
                    {timetable.map((slot, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${slot.period} - ${slot.subject}`}
                          secondary={slot.time}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              {/* Student Management */}
              <Grid item xs={12} md={12}>
                <Paper
                  sx={{
                    padding: "20px",
                    color: "whitesmoke",
                    backgroundColor: "#0095ff",
                  }}
                >
                  <Typography variant="h6">Student Management</Typography>
                  <List>
                    {students.map((student, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={student.name}
                          secondary={`Attendance: ${student.attendance}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              {/* Reports and Analytics */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    padding: "20px",
                    color: "whitesmoke",
                    backgroundColor: "#0095ff",
                  }}
                >
                  <Typography variant="h6">Reports and Analytics</Typography>
                  <Typography variant="body1">
                    View detailed performance reports and analytics here.
                  </Typography>
                  {/* You can add charts or detailed reports here */}
                </Paper>
              </Grid>
              {/* Task Management */}
              <Grid item xs={12} md={12}>
                <Paper
                  sx={{
                    padding: "20px",
                    color: "whitesmoke",
                    backgroundColor: "#0095ff",
                  }}
                >
                  <Typography variant="h6">Task Management</Typography>
                  <List>
                    {tasks.map((task) => (
                      <ListItem key={task.id}>
                        <ListItemText
                          primary={task.text}
                          secondary={task.completed ? "Completed" : "Pending"}
                        />
                        <Button
                          variant="contained"
                          color={task.completed ? "success" : "secondary"}
                        >
                          {task.completed ? "Completed" : "Mark as Done"}
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </section>
      <Footer />
    </>
  );
}

export default StaffDashboard;
