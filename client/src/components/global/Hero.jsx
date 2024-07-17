import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/authSlice";

const Hero = () => {
  const navigate = useNavigate();
  const userLoggedIn = useSelector(selectIsLoggedIn);
  const userInfo = useSelector(selectUser);
  return (
    <section className="hero">
      <div className="content">
        <div className="title">
          <h1>NEW PARADISE</h1>
          <h1>PREPARATORY</h1>
          <h1>SCHOOL</h1>
        </div>
        <div className="sub-title">
          <p>Where Children Comes First</p>
          <p>Unleash Your Child's Potential</p>
        </div>
        <div className="buttons">
          <button>Apply Now</button>
          <button
            onClick={() => {
              userLoggedIn && userInfo.role === "student"
                ? navigate("/dashboard")
                : navigate("/student/login");
            }}
          >
            {userLoggedIn && userInfo.role === "student"
              ? "Student Dashboard"
              : "Student Portal"}
          </button>
          <button
            onClick={() => {
              userLoggedIn && userInfo.role !== "student"
                ? navigate("/dashboard")
                : navigate("/staff/login");
            }}
          >
            {userLoggedIn && userInfo.role !== "student"
              ? "Staff Dashboard"
              : "Staff Portal"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
