import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Navbar from "../../components/global/Navbar";

const studentsData = [
  {
    id: 1,
    name: "Alicia Appiatu",
    studentId: "S12345",
    class: "Grade 5",
    amountOwing: "150.00",
    picture: "/me.jpg",
  },
  {
    id: 2,
    name: "Majid Mustapher",
    studentId: "NEPPS12346",
    class: "JHS 3",
    amountOwing: "700.00",
    picture: "",
  },
  {
    id: 3,
    name: "Isaac Appiatu",
    studentId: "NEPPS12347",
    class: "JHS 2",
    amountOwing: "200.00",
    picture: "",
  },
  {
    id: 4,
    name: "Anokye",
    studentId: "NEPPS12348",
    class: "JHS 1",
    amountOwing: "800.00",
    picture: "",
  },
  // Add more student data as needed
];

function ManageFees() {
  const [searchQuery, setSearchQuery] = useState("");
  //   const [searchResults, setSearchResults] = useState([]);
  const [students, setStudents] = useState(studentsData);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = studentsData.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.studentId.toLowerCase().includes(query) ||
          student.class.toLowerCase().includes(query)
      );
      setStudents(results);
    } else {
      setStudents(studentsData);
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <Box
          sx={{
            padding: "10px",
            // margin: { xs: "20px", md: "20px auto" },
            minWidth: "80%",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            textAlign: "center",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-around" },
            alignItems: "center",
          }}
        >
          <h1>Fees Management</h1>
          <TextField
            variant="outlined"
            placeholder="Search student"
            value={searchQuery}
            onChange={handleSearch}
            sx={{
            //   marginTop: "20px",
              width: "100%",
              maxWidth: "400px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
            padding: "20px",
          }}
        >
          {students.map((student) => (
            <Card key={student.id} sx={{ maxWidth: 650, width: "100%" }}>
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Avatar alt={student.name} src={student.picture} />
                  <Box sx={{ gap: "15px" }}>
                    <Typography variant="h6" sx={{ color: "darkblue" }}>
                      {student.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Student ID: {student.studentId}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Class: {student.class}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Amount Owing: {student.amountOwing}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ marginY: "15px" }} />
                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}></Box> */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "15px",
                    gap: "10px",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="success"
                    startIcon={<PaymentIcon />}
                  >
                    Payment
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ReceiptIcon />}
                  >
                    Bill
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </section>
    </>
  );
}

export default ManageFees;
