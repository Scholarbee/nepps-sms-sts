import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";
import {
  Avatar,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const steps = ["Bio", "Parent", "Others"];

function AddStudent() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [otherName, setOtherName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [religion, setReligion] = useState("");
  const [nhis, setNHIS] = useState("");
  const [Class, setClass] = useState("");
  const [residency, setResidency] = useState("");
  const [profilePicture, setProfilePicture] = useState("");


  const [motherName, setMotherName] = useState("");
  const [motherAddress, setMotherAddress] = useState("");
  const [motherOccupation, setMotherOccupation] = useState("");
  const [motherPhone, setMotherPhone] = useState("");

  const [fatherName, setFatherName] = useState("");
  const [fatherAddress, setFatherAddress] = useState("");
  const [fatherOccupation, setFatherOccupation] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");

  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactAddress, setEmergencyContactAddress] = useState("");
  const [emergencyContactOccupation, setEmergencyContactOccupation] =
    useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");

  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    if (activeStep === 3) {
      handleSumit();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleSumit = () => {
    navigate("/students");
    toast.success("Student added successfully.");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleReset = () => {
  //   setActiveStep(1);
  // };

  return (
    <>
      <Navbar />
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: "calc(100vh - 64px - 60px)",
          padding: "20px 10px",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            margin: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h1>Add Student</h1>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Stepper
            sx={{ marginBottom: 3 }}
            activeStep={activeStep - 1}
            alternativeLabel
          >
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};
              //
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Box>
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item xs={12} md={8}>
                {activeStep === 1 && (
                  <React.Fragment>
                    <Grid
                      container
                      spacing={2}
                      sx={{ padding: { xs: 2, md: 1 } }}
                    >
                      <Grid item xs={12} sm={4}>
                        <TextField
                          autoComplete="firstname"
                          name="firstname"
                          required
                          fullWidth
                          value={firstName}
                          id="firstname"
                          label="First name"
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          autoComplete="surname"
                          name="surname"
                          required
                          fullWidth
                          value={surname}
                          id="surname"
                          label="Surname"
                          onChange={(e) => {
                            setSurname(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          autoComplete="othername"
                          name="othername"
                          required
                          fullWidth
                          value={otherName}
                          id="othername"
                          label="Other Names"
                          onChange={(e) => {
                            setOtherName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl required sx={{ width: "100%" }}>
                          <InputLabel id="demo-simple-select-required-label">
                            Gender
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={gender}
                            label="Gender *"
                            onChange={(e) => {
                              setGender(e.target.value);
                            }}
                          >
                            <MenuItem value="">
                              <em>select gender</em>
                            </MenuItem>
                            <MenuItem value={1}>Male</MenuItem>
                            <MenuItem value={2}>Female</MenuItem>
                            <MenuItem value={0}>Others</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl required sx={{ width: "100%" }}>
                          <InputLabel id="demo-simple-select-required-label">
                            Religion
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={religion}
                            label="Religion *"
                            onChange={(e) => {
                              setReligion(e.target.value);
                            }}
                          >
                            <MenuItem value="">
                              <em>select Religion</em>
                            </MenuItem>
                            <MenuItem value={1}>Christian</MenuItem>
                            <MenuItem value={2}>Islamic</MenuItem>
                            <MenuItem value={0}>Traditional</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <InputLabel id="demo-simple-select-required-label">
                          Date Of Birth
                        </InputLabel>
                        <Box
                          component="input"
                          type="date"
                          // label="Date"
                          sx={{
                            padding: "10px 10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            width: "100%",
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="city"
                          label="Home Town"
                          name="city"
                          autoComplete="city"
                          // onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="phone"
                          label="Phone"
                          name="phone"
                          autoComplete="phone"
                          // onChange={handleInputChange}
                        />
                      </Grid>
                    </Grid>
                  </React.Fragment>
                )}
                {activeStep === 2 && (
                  <Box sx={{ padding: "0 20px" }}>
                    {/* Mother */}
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={1}
                      sx={{
                        border: "1px solid darkblue",
                        padding: 2,
                        borderRadius: 2,
                        marginBottom: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h3>{"Mother's Info"}</h3>
                      </Box>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          autoComplete="mother-name"
                          name="mothername"
                          required
                          fullWidth
                          value={motherName}
                          id="mothername"
                          label="Mother's Name"
                          // autoFocus
                          onChange={(e) => {
                            setMotherName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="motherAddress"
                          label="Address"
                          name="motherAddress"
                          value={motherAddress}
                          autoComplete="address"
                          onChange={(e) => {
                            setMotherAddress(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="occupation"
                          label="Occupation"
                          name="motherOccupation"
                          value={motherOccupation}
                          autoComplete="occupation"
                          onChange={(e) => {
                            setMotherOccupation(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="motherphone"
                          label="Phone"
                          name="motherphone"
                          value={motherPhone}
                          autoComplete="mother-phone"
                          onChange={(e) => {
                            setMotherPhone(e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* Father */}

                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={1}
                      sx={{
                        border: "1px solid darkblue",
                        padding: 2,
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h3>{"Father's Info"}</h3>
                      </Box>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          autoComplete="father-name"
                          name="fathername"
                          required
                          fullWidth
                          value={fatherName}
                          id="fathername"
                          label="Father's Name"
                          // autoFocus
                          onChange={(e) => {
                            setFatherName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="address"
                          label="Address"
                          name="fatheraddress"
                          value={fatherAddress}
                          autoComplete="address"
                          onChange={(e) => {
                            setFatherAddress(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="occupation"
                          label="Occupation"
                          name="fatherOccupation"
                          value={fatherOccupation}
                          autoComplete="occupation"
                          onChange={(e) => {
                            setFatherOccupation(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="fatherphone"
                          label="Phone"
                          name="fatherPhone"
                          value={fatherPhone}
                          autoComplete="father-phone"
                          onChange={(e) => {
                            setFatherPhone(e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* Emergency contact */}
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={1}
                      sx={{
                        border: "1px solid darkblue",
                        padding: 2,
                        borderRadius: 2,
                        marginTop: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h3>Emergency Contact</h3>
                      </Box>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          autoComplete="name"
                          name="emergencyContactName"
                          required
                          fullWidth
                          value={emergencyContactName}
                          id="mothername"
                          label="Name"
                          // autoFocus
                          onChange={(e) => {
                            setEmergencyContactName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="emergencyContactAddress"
                          label="Address"
                          name="emergencyContactAddress"
                          value={emergencyContactAddress}
                          autoComplete="address"
                          onChange={(e) => {
                            setEmergencyContactAddress(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="occupation"
                          label="Occupation"
                          name="motherOccupation"
                          value={emergencyContactOccupation}
                          autoComplete="occupation"
                          onChange={(e) => {
                            setEmergencyContactOccupation(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="emergencyContactPhone"
                          label="Phone"
                          name="emergencyContactPhone"
                          value={emergencyContactPhone}
                          autoComplete="mother-phone"
                          onChange={(e) => {
                            setEmergencyContactPhone(e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
                {activeStep === 3 && (
                  <React.Fragment>
                    <Grid
                      container
                      spacing={2}
                      sx={{ padding: { xs: 2, md: 1 } }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          src={profilePicture}
                          sx={{ width: 150, height: 170 }}
                        />
                        <input
                          style={{
                            border: "1px solid black",
                            padding: "5px",
                            width: 150,
                            marginTop:"5px",
                            borderRadius:2
                          }}
                          type="file"
                          accept="image/*"
                          name="profilePicture"
                          onChange={handleFileChange}
                          className="coverPhoto"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          autoComplete="nhis"
                          name="nhis"
                          required
                          fullWidth
                          value={nhis}
                          id="nhis"
                          label="NHIS"
                          onChange={(e) => {
                            setNHIS(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl required sx={{ width: "100%" }}>
                          <InputLabel id="demo-simple-select-required-label">
                            Class
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={Class}
                            label="Class *"
                            onChange={(e) => {
                              setClass(e.target.value);
                            }}
                          >
                            <MenuItem value="">
                              <em>select class</em>
                            </MenuItem>
                            <MenuItem value={1}>JHS 1</MenuItem>
                            <MenuItem value={2}>JHS 2</MenuItem>
                            <MenuItem value={0}>JHS 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl required sx={{ width: "100%" }}>
                          <InputLabel id="demo-simple-select-required-label">
                            Residency
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-required-label"
                            id="demo-simple-select-required"
                            value={residency}
                            label="Residency *"
                            onChange={(e) => {
                              setResidency(e.target.value);
                            }}
                          >
                            <MenuItem value="">
                              <em>select residency</em>
                            </MenuItem>
                            <MenuItem value={1}>Day</MenuItem>
                            <MenuItem value={2}>Boarder</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                )}
                <Box sx={{ display: "flex", flexDirection: "row", p: 4 }}>
                  <Button
                    variant="contained"
                    // color="primary"
                    color="inherit"
                    disabled={activeStep === 1}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    {"<< Back"}
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button
                    variant="contained"
                    color={activeStep === 3 ? "success" : "primary"}
                    onClick={handleNext}
                  >
                    {activeStep === 3 ? "Submit" : "Next >>"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </section>
      <Footer />
    </>
  );
}

export default AddStudent;
