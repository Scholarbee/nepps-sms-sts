import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Get fees detail
 */
export const GetFeeDetails = async (token) => {
  try {
    const response = axios.get(`${BACKEND_URL}/api/account/fees/${token}`);
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
 * Get fee detail
 */
export const GetFeeDetail = async (token) => {
  try {
    const response = axios.get(`${BACKEND_URL}/api/account/fee/${token}`);
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
export const getCurrentBill = async (id, token) => {
  try {
    const response = axios.get(
      `${BACKEND_URL}/api/account/bills/current/${id}/${token}`
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
export const addPayment = async (id, formData, token) => {
  try {
    const response = axios.put(
      `${BACKEND_URL}/api/account/fees/add-payment/${id}/${token}`,
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

/**
 * Delete payment
 */
export const delPayment = async (id, token) => {
  try {
    const response = axios.put(
      `${BACKEND_URL}/api/account/fees/add-payment/${id}/${token}`
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
 * Add bill
 */
export const addBill = async (id, formData, token) => {
  const response = axios.put(
    `${BACKEND_URL}/api/account/bills/add-bill/${id}/${token}`,
    formData
  );
  return response;
};

/**
 * Add bill
 */
export const editBill = async (feeId, billId, formData, token) => {
  const response = axios.put(
    `${BACKEND_URL}/api/account/bills/edit-bill/${feeId}/${billId}/${token}`,
    formData
  );
  return response;
};

/**
 * Delete bill
 */
export const delBill = async (feeId, billId, token) => {
  const response = axios.put(
    `${BACKEND_URL}/api/account/bills/remove-bill/${feeId}/${billId}/${token}`
  );
  return response;
};

/**
 * get Payment Details
 */
export const getPaymentDetails = async (paymentId, token) => {
  const response = axios.get(
    `${BACKEND_URL}/api/account/fees/payment-details/${paymentId}/${token}`
  );
  return response;
};

/**
 * get grandtotal
 */
export const grandtotal = async (token) => {
  const response = axios.get(`${BACKEND_URL}/api/account/grandtotal/${token}`);
  return response;
};

/**
 * get Yearly Payments
 */
export const getYearlyPayments = async (token) => {
  const response = axios.get(
    `${BACKEND_URL}/api/account/yearly-payment/${token}`
  );
  return response;
};
