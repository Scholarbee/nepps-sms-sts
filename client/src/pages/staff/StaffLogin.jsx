import axios from "axios";
import "./staffLogin.css";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function StaffLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.success("You have successfully logged in as a Staff");
    setLoading(false);
    navigate("/dashboard");
  };
  return (
    <section className="login">
      <form onSubmit={loginHandler}>
        <h1>STAFF LOGIN</h1>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            autoComplete="email"
            name="password"
            placeholder="e.g scholarbee6@sts.com"
            onChange={(e) => setEmail(e.target.value)}
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
          // onClick={()=>{}}
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

export default StaffLogin;
