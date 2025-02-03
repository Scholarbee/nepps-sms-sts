import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Login User
export const loginUser = async (userData) => {
  const response = axios.post(`${BACKEND_URL}/api/users/login`, userData);
  if (response.statusText === "OK") {
    toast.success("Login Successful...");
  }
  return response;
};

// Logout User
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/users/logout`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Forgot Password
export const forgotPassword = async (userData) => {
  const response = axios.post(
    `${BACKEND_URL}/api/users/forgot-password`,
    userData
  );
  return response;
};

// Reset Password
export const resetPassword = async (userData, resetToken) => {
  console.log(userData);
  console.log(resetToken);
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/users/reset-password/${resetToken}`,
      userData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get Login Status
export const getLoginStatus = async (userToken) => {
  const response = axios.get(
    `${BACKEND_URL}/api/users/login-status/${userToken}`
  );
  return response;
};

// Get User Profile
export const getUser = async (token) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/users/user-info/${token}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Update Profile
export const updateUser = async (formData, token) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/updateuser/${token}`,
      formData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

/**
 * change Password
 * @param {*} formData
 * @returns
 */
export const changePassword = async (formData, token) => {
  const response = axios.put(
    `${BACKEND_URL}/api/users/change-password/${token}`,
    formData
  );
  return response;
};

// Block user
export const adminBlockUser = async (id, token) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/users/block-user/${id}/${token}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Unblock user
export const adminUnblockUser = async (id, token) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/users/unblock-user/${id}/${token}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Delete user
export const adminDeleteUser = async (id, token) => {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/api/users/delete-user/${id}/${token}`
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
