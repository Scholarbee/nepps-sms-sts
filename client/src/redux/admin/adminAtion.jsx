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
export const getStudent = async (id,token) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/students/student/${id}/${token}`
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
export const addStudent = async (formData,token) => {
  try {
    const response = axios.post(
      `${BACKEND_URL}/api/students/add-student/${token}`,
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
 * Edit student
 */
export const updateStudent = async (id, formData, token) => {
  try {
    const response = axios.put(
      `${BACKEND_URL}/api/students/edit-student/${id}/${token}`,
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
 * Deleted student
 */
export const deleteStudent = async (id, token) => {
  try {
    const response = axios.delete(
      `${BACKEND_URL}/api/students/delete-student/${id}/${token}`
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
 * Get all staffs
 */
export const getStaffs = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/staffs`);
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
 * Get single staff
 */
export const getStaff = async (id) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/staffs/staff/${id}`);
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
 * Add staff
 */
export const addStaff = async (formData, token) => {
  try {
    const response = axios.post(
      `${BACKEND_URL}/api/staffs/add-staff/${token}`,
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
 * Edit staff
 */
export const updateStaff = async (id, formData, token) => {
  try {
    const response = axios.put(
      `${BACKEND_URL}/api/staffs/edit-staff/${id}/${token}`,
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
 * Deleted staff
 */
export const deleteStaff = async (id, token) => {
  try {
    const response = axios.delete(
      `${BACKEND_URL}/api/staffs/delete-staff/${id}/${token}`
    );
    if (response.statusText === "OK") {
      toast.success("staff updated successfully.");
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
export const addClass = async (formData, token) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/admin/classes/add-class/${token}`,
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
export const updateClass = async (id, formData, token) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/admin/classes/edit-class/${id}/${token}`,
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
 * Get all classes
 */
export const getStudentCounts = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/api/admin//classes/students`
  );
  return response;
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

/**
 * Get all subjects
 */
export const getSubjects = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/admin/subjects`);
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
 * Add subject
 */
export const addSubject = async (formData, token) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/admin/subjects/add-subject/${token}`,
    formData
  );

  return response;
};

/**
 * Edit subject
 */
export const updateSubject = async (id, formData, token) => {
  const response = axios.put(
    `${BACKEND_URL}/api/admin/subjects/edit-subject/${id}/${token}`,
    formData
  );
  return response;
};
