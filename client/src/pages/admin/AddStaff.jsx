import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";
import {
  Avatar,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addStaff } from "../../redux/admin/adminAtion";
import { ClipLoader } from "react-spinners";

function AddStaff() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [otherName, setOtherName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [religion, setReligion] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [my_file, setMy_file] = useState("");


  const handleSumit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("surname", surname);
    formData.append("otherName", otherName);
    formData.append("gender", gender);
    formData.append("birthDate", birthDate);
    formData.append("my_file", my_file);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("religion", religion);
    try {
      let con = window.confirm("Please confirm action.");
      if (con) {
        await addStaff(formData);
        // console.log(formData);
        toast.success("Staff added successfully.");
        navigate("/staffs");
      }
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMy_file(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
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
          <h1>Add Staff</h1>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box>
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2} sx={{ padding: { xs: 2, md: 1 } }}>
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
                      // variant="rounded"
                      src={profilePicture}
                      sx={{ width: 120, height: 120 }}
                    />
                    <input
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        width: 150,
                        marginTop: "5px",
                        borderRadius: 2,
                      }}
                      type="file"
                      accept="image/*"
                      name="profilePicture"
                      onChange={handleFileChange}
                      className="coverPhoto"
                    />
                    <label htmlFor="profilePicture">Set Profile Picture</label>
                  </Grid>
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
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Others"}>Others</MenuItem>
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
                        <MenuItem value={"Christian"}>Christian</MenuItem>
                        <MenuItem value={"Islamic"}>Islamic</MenuItem>
                        <MenuItem value={"Traditional"}>Traditional</MenuItem>
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
                      value={birthDate}
                      onChange={(e) => {
                        setBirthDate(e.target.value);
                      }}
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
                      id="address"
                      label="Address"
                      name="address"
                      value={address}
                      autoComplete="address"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl required sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-required-label">
                        Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={role}
                        label="Role *"
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>select role</em>
                        </MenuItem>
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"teacher"}>Teacher</MenuItem>
                        {/* <MenuItem value={"student"}>Others</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone"
                      value={phone}
                      name="phone"
                      autoComplete="phone"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="email"
                      value={email}
                      name="email"
                      autoComplete="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Box sx={{ display: "flex" }}>
                      <Button
                        variant="contained"
                        // color="primary"
                        color="inherit"
                        // disabled={activeStep === 1}
                        onClick={() => {
                          navigate("/staffs");
                        }}
                        sx={{ mr: 1 }}
                      >
                        {"<< Back"}
                      </Button>
                      {/* <Box sx={{ flex: "1 1 auto" }} /> */}

                      <Button
                        variant="contained"
                        color={"success"}
                        onClick={handleSumit}
                        disabled={loading}
                      >
                        Submit
                        {loading && <ClipLoader size={20} color="white" />}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </section>
      <Footer />
    </>
  );
}

export default AddStaff;
