import { Box, Grid } from "@mui/material";
import Receipt from "../../components/fees/Receipt";
import Navbar from "../../components/global/Navbar";
import { useParams } from "react-router-dom";
import { getPaymentDetails } from "../../redux/account/accountActions";
import { useEffect, useState } from "react";
import { selectToken } from "../../redux/auth/authSlice";
import { useSelector } from "react-redux";

function PrintReceipt() {
  const userToken = useSelector(selectToken);
  const { id } = useParams();

  const [paymentDetail, setPaymentDetail] = useState({});
  const [term, setTerm] = useState("");
  const [year, setYear] = useState("");
  const [className, setClassName] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [receivedBy, setReceivedBy] = useState({});

  useEffect(() => {
    showPaymentDetails();
  }, []);

  const showPaymentDetails = async () => {
    try {
      const { data } = await getPaymentDetails(id, userToken);
      
      setPaymentDetail(data.paymentDetails.paymentList[0]);
      setTerm(data.paymentDetails.term);
      setYear(data.paymentDetails.year);
      setClassName(data.paymentDetails.studentId.classId.className);
      setStudentId(data.paymentDetails.studentId.user.id);
      setReceivedBy(data.paymentDetails.paymentList[0].receivedBy);
      setName(
        `${data.paymentDetails.studentId.firstName} ${data.paymentDetails.studentId.otherName} ${data.paymentDetails.studentId.surname}`
      );
      console.log(data.paymentDetails.paymentList[0].receivedBy);
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
            <Receipt
              receiptData={paymentDetail}
              data={data}
              receivedBy={receivedBy}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default PrintReceipt;
