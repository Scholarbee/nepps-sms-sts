import { Routes, Route, HashRouter } from "react-router-dom";
import LandingPage from "./pages/global/LandingPage";
import "./App.css";
import StaffLogin from "./pages/staff/StaffLogin";
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import AddStaff from "./pages/admin/AddStaff";
import ManageStaff from "./pages/admin/ManageStaff";
import UpdateStaff from "./pages/admin/UpdateStaff";
import GetStaff from "./pages/admin/GetStaff";
import ManageStudent from "./pages/admin/ManageStudent";
import AddStudent from "./pages/admin/AddStudent";
import UpdateStudent from "./pages/admin/UpdateStudent";
import GetStudent from "./pages/admin/GetStudent";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" Component={LandingPage}></Route>

          {/* Admin routes */}
          <Route path="/staffs" Component={ManageStaff}></Route>
          <Route path="/staffs/add-staff" Component={AddStaff}></Route>
          <Route path="/staffs/edit-staff/:id" Component={UpdateStaff}></Route>
          <Route path="/staffs/get-staff/:id" Component={GetStaff}></Route>
          
          <Route path="/students" Component={ManageStudent}></Route>
          <Route path="/students/add-student" Component={AddStudent}></Route>
          <Route path="/students/edit-student/:id" Component={UpdateStudent}></Route>
          <Route path="/students/get-student/:id" Component={GetStudent}></Route>

          {/* Staff routes */}
          <Route path="/staff/login" Component={StaffLogin}></Route>
          <Route path="/dashboard" Component={StaffDashboard}></Route>

          {/* Student routs */}
          <Route path="/student/login" Component={StudentLogin}></Route>
          <Route path="/student/dashboard" Component={StudentDashboard}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
