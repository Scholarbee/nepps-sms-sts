import React, { useEffect, useState } from "react";
import Navbar from "../../../components/global/Navbar";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { addClass, getClass } from "../../../redux/admin/adminAtion";
import { toast } from "react-toastify";

function AddClass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  // const [classRep, setClassRep] = useState("");
  // const [classHead, setClassHead] = useState("");
  const [schoolFees, setSchoolFees] = useState();
  const [boardingFee, setBoardingFee] = useState();
  const [admissionFee, setAdmissionFee] = useState();

  // const formDate = {
  //   className,
  //   classRep,
  //   classHead,
  //   schoolFees: parseFloat(schoolFees).toFixed(2),
  //   admissionFee: parseFloat(admissionFee).toFixed(2),
  //   boardingFee: parseFloat(boardingFee).toFixed(2),
  // };

  useEffect(() => {
    // console.log(id);
    showClass();
  }, []);

  const showClass = async () => {
    try {
      let { data } = await getClass(id);
      console.log(data);
      setClassName(data.className);
      setAdmissionFee(data.admissionFee);
      setBoardingFee(data.boardingFee);
      setSchoolFees(data.schoolFees);
    } catch (error) {
      toast.error(
        error.response.data.message &&
          error.response.data &&
          error.response &&
          error.toString()
      );
    }
  };

  const handleSubmit = async () => {
    console.log(formDate);
    try {
      await addClass(formDate);
      navigate("/classes");
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(
        error.response.data.message &&
          error.response.data &&
          error.response &&
          error.toString()
      );
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
          <h1>Add Class</h1>
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
            container
            item
            spacing={2}
            xs={12}
            md={8}
            sx={{
              padding: 2,
            }}
          >
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="className"
                name="className"
                required
                fullWidth
                value={className}
                id="className"
                label="Class Name"
                onChange={(e) => {
                  setClassName(e.target.value);
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <FormControl required sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-required-label">
                  Class Head
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={classHead}
                  label="Class Head *"
                  onChange={(e) => {
                    setClassHead(e.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>select class head</em>
                  </MenuItem>
                  <MenuItem value={"Anokye"}>Anokye</MenuItem>
                  <MenuItem value={"Majid"}>Majid</MenuItem>
                  <MenuItem value={"Tieku"}>Tieku</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-required-label">
                  Class Rep
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={classRep}
                  label="Class Rep *"
                  onChange={(e) => {
                    setClassRep(e.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>select class rep</em>
                  </MenuItem>
                  <MenuItem value={"Anokye"}>Anokye</MenuItem>
                  <MenuItem value={"Majid"}>Majid</MenuItem>
                  <MenuItem value={"Tieku"}>Tieku</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="schoolFees"
                name="schoolFees"
                required
                fullWidth
                value={schoolFees}
                id="schoolFees"
                label="School Fees"
                onChange={(e) => {
                  setSchoolFees(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="boardingFee"
                name="boardingFees"
                required
                fullWidth
                value={boardingFee}
                id="boardingFee"
                label="Boarding Fees"
                onChange={(e) => {
                  setBoardingFee(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="className"
                name="className"
                required
                fullWidth
                value={admissionFee}
                id="className"
                label="Class Name"
                onChange={(e) => {
                  setClassName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="admissionFee"
                name="admissionFee"
                required
                fullWidth
                value={admissionFee}
                id="admissionFee"
                label="Admission Fee"
                onChange={(e) => {
                  setAdmissionFee(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "10px 0",
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/classes")}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </section>
    </>
  );
}

export default AddClass;
