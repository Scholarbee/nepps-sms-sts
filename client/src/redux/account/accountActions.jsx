import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Get current Bills
 */
export const getCurrentBill = async (id) => {
  try {
    const response = axios.get(
      `${BACKEND_URL}/api/account/bills/current/${id}`
    );
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};