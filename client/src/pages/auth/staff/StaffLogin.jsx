import "./staffLogin.css";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
  SET_TOKEN,
} from "../../../redux/auth/authSlice";
import { loginUser } from "../../../redux/auth/authActions";
import { useDispatch } from "react-redux";

function StaffLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      // console.log(data);
      dispatch(SET_LOGIN(true));
      dispatch(SET_TOKEN(data.token));
      dispatch(SET_NAME(data.firstName + " " + data.surname));
      dispatch(SET_USER(data));

      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
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
          disabled={isLoading}
          // onClick={()=>{}}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {isLoading && <ClipLoader size={20} color="white" />}
          Login
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Link to={"/"}>Return Home</Link>
          <Link to={"/staff/forgot-password"}>Forgot Password</Link>
        </div>
      </form>
    </section>
  );
}

export default StaffLogin;
