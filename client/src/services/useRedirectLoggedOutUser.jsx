import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SET_LOGIN } from "../redux/auth/authSlice";
import { getLoginStatus } from "../redux/auth/authActions";
import axios from "axios";

// Enable sending credentials with requests
axios.defaults.withCredentials = true;

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      try {
        const isLoggedIn = await getLoginStatus();
        dispatch(SET_LOGIN(isLoggedIn.data));

        if (!isLoggedIn.data) {
          toast.info("Session expired, please login to continue.");
          navigate(path);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        toast.error("An error occurred. Please try logging in again.");
        navigate(path);
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
