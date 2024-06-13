import React from "react";
import Navbar from "../../components/global/Navbar";
import {
  Avatar,
  Box,
  Button,
  Chip,
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "18px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

function CurrentBill() {
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
            Current Bill
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chip
            avatar={<Avatar alt="" src="/me.jpg" />}
            label="Scholar Bee"
            variant="outlined"
          />
          <Chip
            // avatar={<Avatar alt="I D" src="/me1.jpg" />}
            label="ID: NEPPS5051241"
            variant="outlined"
          />
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
                startIcon={<AddIcon />}
                // sx={{ width: { xs: "100%", sm: "auto" } }}
                // onClick={() => {
                //   navigate("/students/add-student");
                // }}
              >
                New
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sn</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell>1</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      School fees
                    </StyledTableCell>
                    <StyledTableCell>200</StyledTableCell>
                    <StyledTableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton
                          //   onClick={() => handleEdit(student.id)}
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
                  <StyledTableRow>
                    <StyledTableCell>2</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      Books
                    </StyledTableCell>
                    <StyledTableCell>650</StyledTableCell>
                    <StyledTableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton
                          //   onClick={() => handleEdit(student.id)}
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
                  <StyledTableRow>
                    <StyledTableCell>3</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      Extra Classes Fees
                    </StyledTableCell>
                    <StyledTableCell>150</StyledTableCell>
                    <StyledTableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton
                          //   onClick={() => handleEdit(student.id)}
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
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </section>
    </>
  );
}

export default CurrentBill;
