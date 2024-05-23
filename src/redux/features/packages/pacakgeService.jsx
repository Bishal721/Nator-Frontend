import axios from "axios";
// import { toast } from "react-toastify";
import { BACKEND_URL } from "../../../services/authService";
const API_URL = `${BACKEND_URL}/api/v1/package/`;

const createPackage = async (formData) => {
  // console.log(API_URL + "createPackage");
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
  console.log(formData);
  const response = await axios.patch(`${API_URL}${id}`, formData);
  console.log(response);
  return response.data;
};

// Delete a  Product
const deletePackage = async (id) => {
  console.log(API_URL + id);
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
  console.log(formData);
  const response = await axios.post(API_URL + "createBooking ", formData);
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
};
export default packageService;
