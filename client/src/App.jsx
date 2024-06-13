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
import ManageFees from "./pages/account/ManageFees";
import ManageExam from "./pages/exam/ManageExam";
import Attendance from "./pages/staff/Attendance";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrentBill from "./pages/account/CurrentBill";
import FeePayment from "./pages/account/FeePayment";
import ManageClass from "./pages/admin/class/ManageClass";
import AddClass from "./pages/admin/class/AddClass";
import UpdateClass from "./pages/admin/class/UpdateClass";
import GetClass from "./pages/admin/class/GetClass";

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
          <Route
            path="/students/edit-student/:id"
            Component={UpdateStudent}
          ></Route>
          <Route
            path="/students/get-student-info/:id"
            Component={GetStudent}
          ></Route>

          <Route path="/classes" Component={ManageClass}></Route>
          <Route path="/classes/add-class" Component={AddClass}></Route>
          <Route path="/classes/edit-class/:id" Component={UpdateClass}></Route>
          <Route path="/classes/get-class/:id" Component={GetClass}></Route>

          {/* Account */}
          <Route path="/accounts" Component={ManageFees}></Route>
          <Route path="/accounts/payment/:id" Component={FeePayment}></Route>
          <Route path="/accounts/bills/:id" Component={CurrentBill}></Route>

          {/* Examination */}
          <Route path="/exams" Component={ManageExam}></Route>

          {/* Staff routes */}
          <Route path="/staff/login" Component={StaffLogin}></Route>
          <Route path="/dashboard" Component={StaffDashboard}></Route>
          <Route path="/attendance" Component={Attendance}></Route>

          {/* Student routs */}
          <Route path="/student/login" Component={StudentLogin}></Route>
          <Route path="/student/dashboard" Component={StudentDashboard}></Route>
        </Routes>
        <ToastContainer theme="dark" position="top-center" />
      </HashRouter>
    </>
  );
}

export default App;
