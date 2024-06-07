import { Routes, Route, HashRouter } from "react-router-dom";
import LandingPage from "./pages/global/LandingPage";
import "./App.css";
import StaffLogin from "./pages/staff/StaffLogin";
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" Component={LandingPage}></Route>
          <Route path="/staff/login" Component={StaffLogin}></Route>
          <Route path="/dashboard" Component={StaffDashboard}></Route>

          <Route path="/student/login" Component={StudentLogin}></Route>
          <Route path="/student/dashboard" Component={StudentDashboard}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
