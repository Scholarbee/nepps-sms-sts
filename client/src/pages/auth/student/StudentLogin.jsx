// import "./stdLogin.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { loginUser } from "../../../redux/auth/authActions";
import {
  SET_LOGIN,
  SET_NAME,
  SET_TOKEN,
  SET_USER,
} from "../../../redux/auth/authSlice";
import { useDispatch } from "react-redux";

function StudentLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    const userData = {
      id,
      password,
      isStudent: true,
    };
    setIsLoading(true);
    try {
      const {data} = await loginUser(userData);
      console.log(data);
      dispatch(SET_LOGIN(true));
      dispatch(SET_TOKEN(data.token));
      dispatch(SET_NAME(data.firstName + " " + data.surname));
      dispatch(SET_USER(data));

      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      setIsLoading(false);
    }
  };
  return (
    <section className="login">
      <form onSubmit={loginHandler}>
        <h1>STUDENT LOGIN</h1>
        <div>
          <label>Student ID</label>
          <input
            type="text"
            value={id}
            name="userid"
            autoComplete="userid"
            placeholder="e.g NEPPS5010010"
            onChange={(e) => setId(e.target.value)}
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
        <Link to={"/"}>Return Home</Link>
      </form>
    </section>
  );
}

export default StudentLogin;
