import { useEffect, useState } from "react";
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
import { GetFeeDetails } from "../../redux/account/accountActions";

function ManageFees() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    showStudents();
  }, []);

  const showStudents = async () => {
    const { data } = await GetFeeDetails();
    // const { data } = await getStudents();
    setStudents(data.feeDetails);
    setStudentsData(data.feeDetails);
    console.log(data);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = studentsData.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.studentId.toLowerCase().includes(query) ||
          student.className.toLowerCase().includes(query)
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
                  <Avatar
                    alt={student.name}
                    src={student.image}
                    sx={{ height: 100, width: 100 }}
                  />
                  <Box sx={{ gap: "15px" }}>
                    <Typography variant="h6" sx={{ color: "darkblue" }}>
                      {student.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Student ID: {student.studentId}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Class: {student.className}
                    </Typography>
                    {student.arrears > 0 && (
                      <Typography variant="body2" color="textSecondary">
                        Arrears: {student.arrears}
                      </Typography>
                    )}
                    {student.balance > 0 && (
                      <Typography variant="body2" color="textSecondary">
                        Prev. Balance:{" "}
                        {"¢ " + parseFloat(student.balance).toFixed(2)}
                      </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      Term Fee:{" "}
                      {"¢ " + parseFloat(student.currentFees).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Amount To Be Paid:{" "}
                      {"¢" + parseFloat(student.amountToBePaid).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Amount Paid:{" "}
                      {"¢ " + parseFloat(student.totalPaid).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Amount owing:{" "}
                      {student.amountOwing > 0
                        ? "¢ " + parseFloat(student.amountOwing).toFixed(2)
                        : "0.00"}
                    </Typography>
                    {student.amountOwing < 0 && (
                      <Typography variant="body2" color="textSecondary">
                        Balance:{" "}
                        {student.amountOwing < 0 &&
                          "¢ " + parseFloat(-student.amountOwing).toFixed(2)}
                      </Typography>
                    )}
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
