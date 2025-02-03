import { useEffect, useState } from "react";
import Navbar from "../../../components/global/Navbar";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getClasses } from "../../../redux/admin/adminAtion";
import { selectToken } from "../../../redux/auth/authSlice";
import { useSelector } from "react-redux";

function ManageClass() {
  const userToken = useSelector(selectToken);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getAllClasses();
  }, []);

  const getAllClasses = async () => {
    const { data } = await getClasses(userToken);
    setClasses(data.classes);
    // console.log(data);
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
          <Typography
            variant="h4"
            sx={{ color: "darkblue", fontWeight: "bolder" }}
          >
            Class Management
          </Typography>
        </Box>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              padding: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px 0",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  navigate("/classes/add-class");
                }}
                startIcon={<AddIcon />}
              >
                New
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sn</StyledTableCell>
                    <StyledTableCell>Class Name</StyledTableCell>
                    <StyledTableCell>Class Rep</StyledTableCell>
                    <StyledTableCell>Class Head</StyledTableCell>
                    <StyledTableCell>School Fees</StyledTableCell>
                    <StyledTableCell>Boarding Fees</StyledTableCell>
                    <StyledTableCell>Admission Fees</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classes.map((c, i) => {
                    return (
                      <StyledTableRow key={c._id}>
                        <StyledTableCell>{i + 1}</StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {c.className}
                        </StyledTableCell>
                        <StyledTableCell>{c.classRep}</StyledTableCell>
                        <StyledTableCell>{c.classHead}</StyledTableCell>
                        <StyledTableCell>
                          {parseFloat(c.schoolFees).toFixed(2)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {parseFloat(c.boardingFee).toFixed(2)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {parseFloat(c.admissionFee).toFixed(2)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() =>
                                navigate(`/classes/edit-class/${c._id}`)
                              }
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              //   onClick={() => handleDelete(student.id)}
                              color="secondary"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </section>
    </>
  );
}

export default ManageClass;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "15px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
