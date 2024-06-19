import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { getStudents } from "../../redux/admin/adminAtion";

function ManageFees() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    showStudents();
  }, []);

  const showStudents = async () => {
    const { data } = await getStudents();
    setStudents(data.students);
    setStudentsData(data.students);
    // console.log(data);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = studentsData.filter(
        (student) =>
          student.firstName.toLowerCase().includes(query) ||
          student.surname.toLowerCase().includes(query) ||
          student.otherName.toLowerCase().includes(query) ||
          student.user.id.toLowerCase().includes(query) ||
          student.classId.className.toLowerCase().includes(query)
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
            <Card key={student._id} sx={{ maxWidth: 650, width: "100%" }}>
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <Avatar alt={student.name} src={student.image.url} sx={{ height: 100, width: 100 }} />
                  <Box sx={{ gap: "15px" }}>
                    <Typography variant="h6" sx={{ color: "darkblue" }}>
                      {`${student.firstName} ${student.otherName} ${student.surname}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Student ID: {student.user.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Class: {student.classId.className}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Amount Owing: {200}
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
                    onClick={() => {
                      navigate(`/accounts/payment/${student._id}`);
                    }}
                    startIcon={<PaymentIcon />}
                  >
                    Payment
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      navigate(`/accounts/bills/${student._id}`);
                    }}
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
