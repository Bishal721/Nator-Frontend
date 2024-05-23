import axios from "axios";
// import { toast } from "react-toastify";
import { BACKEND_URL } from "../../../services/authService";
const API_URL = `${BACKEND_URL}/api/v1/package/`;

const createPackage = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};
// Get all Packages
const getPackages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// Get Single Package
const getPackage = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
const getExtraPeople = async () => {
  const response = await axios.get(API_URL + "getMaxPeople");
  return response.data;
};

// Update Product
const updatePackage = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

// Delete a  Product
const deletePackage = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

//get five packages
const getFivePackages = async () => {
  const response = await axios.get(API_URL + "getFivePackages");
  return response.data;
};

const createReview = async (formData) => {
  const response = await axios.post(API_URL + "createReview", formData);
  return response.data;
};

const createBooking = async (formData) => {
  const response = await axios.post(API_URL + "createBooking ", formData);
  return response.data;
};
const getSingleBooking = async () => {
  const response = await axios.get(`${API_URL}book/getUserSpecific`);
  return response.data;
};
const getAllBookings = async () => {
  const response = await axios.get(`${API_URL}book/getAllBooking`);
  return response.data;
};

const CancelBooking = async (id) => {
  console.log(id);
  const response = await axios.patch(API_URL + "cancelBooking/" + id);
  console.log(response);
  return response.data;
};
const packageService = {
  createPackage,
  getPackages,
  getPackage,
  updatePackage,
  deletePackage,
  getFivePackages,
  createReview,
  getExtraPeople,
  createBooking,
  getSingleBooking,
  getAllBookings,
  CancelBooking,
};
export default packageService;
