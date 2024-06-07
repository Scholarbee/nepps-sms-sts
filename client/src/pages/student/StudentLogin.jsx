import axios from "axios";
// import "./stdLogin.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function StudentLogin() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.success("You have successfully logged in as a student");
    setLoading(false);
    navigate("/student/dashboard");
  };
  return (
    <section className="login">
      <form onSubmit={loginHandler}>
        <h1>STUDENT LOGIN</h1>
        <div>
          <label>Student ID</label>
          <input
            type="text"
            value={userId}
            name="userid"
            autoComplete="userid"
            placeholder="e.g NEPPS5010010"
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {loading && <ClipLoader size={20} color="white" />}
          Login
        </button>
        <Link to={"/"}>Return Home</Link>
      </form>
    </section>
  );
}

export default StudentLogin;
