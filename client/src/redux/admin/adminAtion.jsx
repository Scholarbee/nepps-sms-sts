import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Get all students
 */
export const getStudents = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/students`);
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
 * Get single student
 */
export const getStudent = async (id) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/students/student/${id}`
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
 * Add student
 */
export const addStudent = async (formData) => {
  try {
    const response = axios.post(
      `${BACKEND_URL}/api/students/add-student`,
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
 * Add student
 */
export const updateStudent = async (id, formData) => {
  try {
    const response = axios.put(
      `${BACKEND_URL}/api/students/edit-student/${id}`,
      formData
    );
    if (response.statusText === "OK") {
      toast.success("Student updated successfully.");
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
 * Add class
 */
export const addClass = async (formData) => {
  try {
    const response = await axios.post(
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
 * Edit class
 */
export const updateClass = async (id, formData) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/admin/classes/edit-class/${id}`,
      formData
    );
    if (response.data.success) {
      toast.success("Class updated successfully.");
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
    const response = await axios.get(`${BACKEND_URL}/api/admin/classes`);
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
 * Get single class
 */
export const getClass = async (id) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/admin/class/${id}`);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
