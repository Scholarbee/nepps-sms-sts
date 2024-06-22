import { useEffect, useState } from "react";
import Navbar from "../../components/global/Navbar";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  addBill,
  delBill,
  editBill,
  getCurrentBill,
} from "../../redux/account/accountActions";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function CurrentBill() {
  const { id } = useParams();
  const [currentBill, setCurrentBill] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [studentId, setStudentId] = useState("");
  const [_class, setClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [feeId, setFeeId] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    showCurrentBill();
  }, []);

  const showCurrentBill = async () => {
    try {
      const { data } = await getCurrentBill(id);
      // console.log(data.currentBill);
      setCurrentBill(data.currentBill.bills);
      setImage(data.currentBill.studentId.image.url);
      setFeeId(data.currentBill._id);
      setStudentId(data.currentBill.studentId.user.id);
      setClass(data.currentBill.studentId.classId.className);
      setName(
        `${data.currentBill.studentId.firstName} ${data.currentBill.studentId.surname}`
      );
    } catch (error) {
      // console.log(error.response);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleAddBill = async () => {
    setLoading(true);
    try {
      let con = window.confirm("Please confirm action.");
      if (con) {
        await addBill(id, { desc, amount });
        await showCurrentBill();
        toast.info("Bill added successfully");
      }
      setOpen(false);
      setEdit(false);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  const handleEditBill = async () => {
    setLoading(true);
    try {
      let con = window.confirm("Please confirm action.");
      if (con) {
        await editBill(feeId, editId, { desc, amount });
        await showCurrentBill();
        toast.info("Bill updated successfully");
      }
      setOpen(false);
      setEdit(false);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleDeleteBill = async (billId) => {
    setLoading(true);
    try {
      let con = window.confirm("Please confirm action.");
      if (con) {
        await delBill(feeId, billId);
        await showCurrentBill();
        toast.info("Bill deleted successfully");
      }
      setLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
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
            avatar={<Avatar alt="" src={image} />}
            label={name}
            variant="outlined"
          />
          <Chip
            // avatar={<Avatar alt="I D" src="/me1.jpg" />}
            label={`ID: ${studentId}`}
            variant="outlined"
          />
          <Chip
            // avatar={<Avatar alt="I D" src="/me1.jpg" />}
            label={`Class: ${_class}`}
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
                onClick={() => {
                  setEdit(false);
                  setDesc("");
                  setAmount("");
                  setOpen(true);
                }}
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
                  {currentBill.map((bill, i) => {
                    return (
                      <StyledTableRow key={bill._id}>
                        <StyledTableCell>{i + 1}</StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {bill.desc}
                        </StyledTableCell>
                        <StyledTableCell>{bill.amount}</StyledTableCell>
                        <StyledTableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => {
                                setEdit(true);
                                setOpen(true);
                                setAmount(bill.amount);
                                setDesc(bill.desc);
                                setEditId(bill._id);
                              }}
                              color="primary"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              disabled={loading}
                              onClick={() => handleDeleteBill(bill._id)}
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
      <Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                sx={{
                  textAlign: "center",
                  borderBottom: "4px solid darkblue",
                  fontSize: 25,
                  fontWeight: "bolder",
                  color: "darkblue",
                }}
                id="transition-modal-title"
                variant="h5"
                component="h2"
              >
                {edit ? "Edit Bill" : "Add Bill"}
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => setDesc(e.target.value)}
                id="desc"
                label="Description"
                value={desc}
                name="desc"
                autoComplete="desc"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="amount"
                label="Amount"
                name="amount"
                autoComplete="amount"
              />
              <Stack sx={{ margin: "20px 0 0 0" }}>
                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={() => {
                    edit ? handleEditBill() : handleAddBill();
                  }}
                >
                  {loading
                    ? "Processing..."
                    : edit
                    ? "Save Changes"
                    : "Add Bill"}
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
}

export default CurrentBill;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 4,
};

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
