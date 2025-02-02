import { useEffect, useState } from "react";
import Navbar from "../../../components/global/Navbar";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
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
import { useNavigate } from "react-router-dom";
import {
  addSubject,
  getClasses,
  getStaffs,
  getSubjects,
  updateSubject,
} from "../../../redux/admin/adminAtion";
import { toast } from "react-toastify";

function ManageSubject() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [subject, setSubject] = useState("");
  const [subjectMaster, setSubjectsMaster] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    getAllSubjects();
    getAllStaff();
  }, []);

  const getAllSubjects = async () => {
    const { data } = await getSubjects();
    setSubjects(data.subjects);
    console.log(data);
  };

  const getAllStaff = async () => {
    const { data } = await getStaffs();
    setStaffs(data.staffs);
    console.log(data);
  };

  const handleAddSubject = async () => {
    setLoading(true);
    try {
      let con = window.confirm("Please confirm action.");
      if (con) {
        await addSubject({ subject, subjectMaster });
        await getAllSubjects();
      }
      toast.info("Subject added successfully");
      setOpen(false);
      setEdit(false);
      setLoading(false);
      setSubject("");
      setSubjectsMaster("");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleEditSubject = async () => {
    setLoading(true);
    try {
      let con = window.confirm("Please confirm action.");
      if (con) {
        await updateSubject(editId, { subject, subjectMaster });
        await getAllSubjects();
        toast.info("Subject updated successfully");
      }
      setOpen(false);
      setEdit(false);
      setLoading(false);
      setSubject("");
      setSubjectsMaster("");
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
      //   setEdit(false);
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
            Subject Management
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
                  // navigate("/classes/add-class");
                  setOpen(true);
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
                    <StyledTableCell>Subject Name</StyledTableCell>
                    <StyledTableCell>Subject Head</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((subject, i) => {
                    return (
                      <StyledTableRow key={subject._id}>
                        <StyledTableCell>{i + 1}</StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {subject.subject}
                        </StyledTableCell>
                        <StyledTableCell>
                          {subject.subjectMaster.firstName +
                            " " +
                            subject.subjectMaster.surname || " "}
                        </StyledTableCell>

                        <StyledTableCell align="right">
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => {
                                setEdit(true);
                                setOpen(true);
                                setSubject(subject.subject);
                                setSubjectsMaster(subject.subjectMaster._id);
                                setEditId(subject._id);
                              }}
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
                {edit ? "Edit Subject" : "Add Subject"}
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => setSubject(e.target.value)}
                id="subject"
                label="Subject Name"
                value={subject}
                name="subject"
                autoComplete="subject"
                autoFocus
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth
                value={subjectMaster}
                onChange={(e) => setSubjectsMaster(e.target.value)}
                id="subjectMaster"
                label="Subject Master"
                name="subjectMaster"
                autoComplete="amount"
              /> */}
              {/* <Grid item xs={12} sm={4}> */}
              <FormControl required sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-required-label">
                  Class
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={subjectMaster}
                  label="Subject Master *"
                  onChange={(e) => setSubjectsMaster(e.target.value)}
                >
                  <MenuItem value="">
                    <em>select class</em>
                  </MenuItem>
                  {staffs.map((staff, i) => {
                    return (
                      <MenuItem key={i} value={staff._id}>
                        {staff.firstName + " " + staff.surname}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* </Grid> */}
              <Stack sx={{ margin: "20px 0 0 0" }}>
                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={() => {
                    edit ? handleEditSubject() : handleAddSubject();
                  }}
                >
                  {loading
                    ? "Processing..."
                    : edit
                    ? "Save Changes"
                    : "Add Subject"}
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
}

export default ManageSubject;

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
