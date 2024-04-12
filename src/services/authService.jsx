import axios from "axios";
import { toast } from "react-toastify";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
// Register User
const registerUser = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/users/register`,
    userData,
    { withCredentials: true }
  );
  return response.data;
};
// Login User
const loginUser = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/users/login`,
    userData
  );
  return response.data;
};
// Logout User
const logoutUser = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/users/logout`);
  return response.data.message;
};
// Forgot Password
const forgotPassword = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/users/forgotpassword`,
    userData
  );
  return response.data.message;
};
//Password Reset
const resetPassword = async (userData, resetToken) => {
  const response = await axios.put(
    `${BACKEND_URL}/api/v1/users/resetpassword/${resetToken}`,
    userData
  );
  return response.data.message;
};
//Get Login Status
const GetLoginStatus = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/users/loggedin`);
  return response.data;
};
//Get User Data
const GetUser = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/users/getuser`);
  return response.data;
};
//Update Profile
const updateUser = async (formData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/api/v1/users/updateuser`,
    formData
  );
  return response.data;
};
//Change Password
const ChangeUserPassword = async (formData) => {
  const response = await axios.patch(
    `${BACKEND_URL}/api/v1/users/changepassword`,
    formData
  );
  return response.data;
};

const googleLogin = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/api/auth/google`, userData);
  return response.data;
};

const getOtp = async () => {
  const response = await axios.post(`${BACKEND_URL}/api/v1/users/otp`);
  return response.data;
};

const compareOtpResponse = async (userData) => {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/users/compareotp`,
    userData
  );
  return response.data;
};

const authService = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  GetLoginStatus,
  GetUser,
  updateUser,
  ChangeUserPassword,
  googleLogin,
  getOtp,
  compareOtpResponse,
};

export default authService;
