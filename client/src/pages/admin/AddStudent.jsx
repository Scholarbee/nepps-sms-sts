import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const steps = ["Bio", "Parent", "Others"];

function AddStudent() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");

  const [motherName, setMotherName] = React.useState("");
  const [motherAddress, setMotherAddress] = React.useState("");
  const [motherOccupation, setMotherOccupation] = React.useState("");
  const [motherPhone, setMotherPhone] = React.useState("");

  const [fatherName, setFatherName] = React.useState("");
  const [fatherAddress, setFatherAddress] = React.useState("");
  const [fatherOccupation, setFatherOccupation] = React.useState("");
  const [fatherPhone, setFatherPhone] = React.useState("");

  const [emergencyContactName, setEmergencyContactName] = React.useState("");
  const [emergencyContactAddress, setEmergencyContactAddress] =
    React.useState("");
  const [emergencyContactOccupation, setEmergencyContactOccupation] =
    React.useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = React.useState("");

  const [activeStep, setActiveStep] = React.useState(1);

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

  const handleReset = () => {
    setActiveStep(1);
  };

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
            <Grid container sx={{display:"flex", justifyContent:"center"}}>
              <Grid item xs={12} md={8}>
                {activeStep === 4 && (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed.
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                )}
                {activeStep === 1 && (
                  <React.Fragment>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          autoComplete="given-name"
                          name="name"
                          required
                          fullWidth
                          value={name}
                          id="name"
                          label="Full name"
                          // autoFocus
                          onChange={(e) => {
                            setName(e.target.value);
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
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 1}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />

                      <Button onClick={handleNext}>
                        {activeStep === 3 ? "Submit" : "Next"}
                      </Button>
                    </Box>
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
                          autoFocus
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
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />

                      <Button onClick={handleNext}>
                        {activeStep === 3 ? "Submit" : "Next"}
                      </Button>
                    </Box>
                  </Box>
                )}
                {activeStep === 3 && (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All other info will be captured here
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />

                      <Button onClick={handleNext}>
                        {activeStep === 3 ? "Submit" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
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
