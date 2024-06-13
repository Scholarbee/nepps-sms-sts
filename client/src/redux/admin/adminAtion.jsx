import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Add class
 */
export const addClass = async (formData) => {
  try {
    const response = axios.post(
      `${BACKEND_URL}/api/admin/classes/add-class`,
      formData
    );
    if (response.statusText === "OK") {
      toast.success("Class Created successfully.");
    }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
/**
 * Get all classes
 */
export const getClasses = async () => {
  try {
    const response = axios.get(`${BACKEND_URL}/api/admin/classes`);
    if (response.statusText === "OK") {
      toast.success("Login Successful...");
    }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
