import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Get fees detail
 */
export const GetFeeDetails = async () => {
  try {
    const response = axios.get(`${BACKEND_URL}/api/account/fees`);
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

/**
 * Add payment
 */
export const addPayment = async (id, formData) => {
  try {
    const response = axios.put(
      `${BACKEND_URL}/api/account/fees/add-payment/${id}`,
      formData
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
