import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";

const steps = ["Bio", "Parent", "Health"];

export default function AddStaff() {
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep - 1}>
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
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep}</Typography>
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
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep}</Typography>
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
          {activeStep === 3 && (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep}</Typography>
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
        </Box>
      </section>
      <Footer />
    </>
  );
}
