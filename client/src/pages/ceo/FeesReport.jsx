import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";
import { getYearlyPayments, grandtotal } from "../../redux/account/accountActions";
import { toast } from "react-toastify";
import Loader from "../../components/global/Loader";

function FeesReport() {
  const [totalPayment, setTotalPayment] = useState("");
  const [totalBills, setTotalBills] = useState("");
  const [totalBalance, setTotalBalance] = useState("");
  const [totalDept, setTotalDept] = useState("");
  const [loading, setLoading] = useState(true);

  const itemsData = [
    { title: "All Time Payment", amount: totalPayment },
    { title: "Total Debt", amount: totalDept },
    { title: "Total Balance", amount: totalBalance },
  ];

  useEffect(() => {
    showStudents();
    showYearlyPayments();
  }, []);

  const showStudents = async () => {
    setLoading(true);
    try {
      const { data } = await grandtotal();
      setTotalBills(data.totalBills);
      setTotalDept(data.totalDept);
      setTotalPayment(data.totalPayments);
      setTotalBalance(data.totalBalance);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const showYearlyPayments = async () => {
    setLoading(true);
    try {
        const { data } = await getYearlyPayments();
        console.log(data);
      //   setTotalBills(data.totalBills);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
          <h1>Fees Report</h1>
        </Box>
        <Grid
          container
          spacing={1}
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            padding: 2,
            justifyContent: "center",
            alignItems: "center",
            // gap:0.1
          }}
        >
          {loading ? (
            <Loader />
          ) : (
            itemsData.map((item, i) => (
              <Grid item key={i} xs={12} sm={4} md={3} lg={2}>
                <Card
                  sx={{
                    display: "flex",
                    // flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    boxShadow: "2 8px 20px -12px rgba(0,0,0,0.3)",
                    "&:hover": {
                      boxShadow: "0 16px 70px 1.125px rgba(0,0,0,0.3)",
                    },
                    marginBottom: 1,
                    backgroundColor: "darkblue",
                    color: "white",
                  }}
                >
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2">
                        {new Intl.NumberFormat(undefined, {
                          style: "currency",
                          currency: "GHS",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(item.amount)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </section>
    </>
  );
}

export default FeesReport;
