// import React from "react";
import { Box, Grid } from "@mui/material";
import Receipt from "../../components/fees/Receipt";
import Navbar from "../../components/global/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { getPaymentDetails } from "../../redux/account/accountActions";
import { useEffect, useState } from "react";

function PrintReceipt() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [paymentDetail, setPaymentDetail] = useState({});
  const [term, setTerm] = useState("");
  const [year, setYear] = useState("");
  const [className, setClassName] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    showPaymentDetails();
  }, []);

  const showPaymentDetails = async () => {
    try {
      const { data } = await getPaymentDetails(id);
      setPaymentDetail(data.paymentDetails.paymentList[0]);
      setTerm(data.paymentDetails.term);
      setYear(data.paymentDetails.year);
      setClassName(data.paymentDetails.studentId.classId.className);
      setStudentId(data.paymentDetails.studentId.user.id);
      setName(
        `${data.paymentDetails.studentId.firstName} ${data.paymentDetails.studentId.otherName} ${data.paymentDetails.studentId.surname}`
      );
      console.log(data.paymentDetails);
    } catch (error) {
      console.log(error.response.data.message);
    }
    };
    
    const data = {
      name,
      className,
      year,
      term,
      studentId,
    };
  return (
    <>
      <Navbar />
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ padding: 1 }}>
            <Receipt receiptData={paymentDetail} data={data} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default PrintReceipt;

// const receiptData = {
//   studentId: "12345",
//   name: "John Doe",
//   className: "Class A",
//   term: "1",
//   year: "2024",
//   amountOwing: 1000,
//   totalPaid: 500,
//   currentFees: 1500,
//   amountToBePaid: 2000,
// };
