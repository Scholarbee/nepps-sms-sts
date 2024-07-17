import { Avatar, Box, Button, Card, CardContent, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GetFeeDetail } from "../../redux/account/accountActions";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";

function CurrentFees() {
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [feeDetail, setFeeDetail] = useState({});
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    showStudents();
  }, []);

  const showStudents = async () => {
    setPageLoading(true);
    try {
      const { data } = await GetFeeDetail();
      // const { data } = await getStudents();
      setStudent(data.feeDetail[0]);
      setFeeDetail(data.feeDetail[0]);
      console.log(data.feeDetail[0]);
      setPageLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setPageLoading(false);
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
          <h1>Current Fees</h1>
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
          <Card key={student._id} sx={{ maxWidth: 650, width: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
                <Avatar
                  alt={student.name}
                  src={student.image}
                  sx={{ height: 100, width: 100 }}
                />
                <Box sx={{ gap: "45px" }}>
                  <Typography variant="h6" sx={{ color: "darkblue" }}>
                    {student.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Student ID: {student.studentId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Class: {student.className}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Term: {student.term}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Year: {student.year}
                  </Typography>
                  {student.arrears > 0 && (
                    <Typography variant="body2" color="textSecondary">
                      Arrears: {"¢ " + student.arrears}
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
                  // onClick={() => {
                  //   navigate(`/accounts/payment/${student._id}`);
                  // }}
                  startIcon={<PaymentIcon />}
                >
                  Make Payment
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  // onClick={() => {
                  //   navigate(`/accounts/bills/${student._id}`);
                  // }}
                  startIcon={<ReceiptIcon />}
                >
                  Bill
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </section>
    </>
  );
}

export default CurrentFees;
