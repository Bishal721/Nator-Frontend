import axios from "axios";
// import { toast } from "react-toastify";
import { BACKEND_URL } from "../../../services/authService";
const API_URL = `${BACKEND_URL}/api/v1/package/`;

const createPackage = async (formData) => {
  // console.log(API_URL + "createPackage");
  console.log(formData);
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

// Update Product
const updatePackage = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

// Delete a  Product
const deletePackage = async (id) => {
  console.log(API_URL + id);
  const response = await axios.delete(API_URL + id);
  return response.data;
};
const packageService = {
  createPackage,
  getPackages,
  getPackage,
  updatePackage,
  deletePackage,
};
export default packageService;
