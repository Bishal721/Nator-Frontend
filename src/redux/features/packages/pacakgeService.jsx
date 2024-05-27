import axios from "axios";
// import { toast } from "react-toastify";
import { BACKEND_URL } from "../../../services/authService";
const API_URL = `${BACKEND_URL}/api/v1/package/`;

const createPackage = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};
// Get all Packages
const getPackages = async (formData) => {
  if (formData === undefined) {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  }
  const response = await axios.get(`${API_URL}?location=${formData.location}`);
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
  const response = await axios.patch(API_URL + "cancelBooking/" + id);
  return response.data;
};
const createCustomBooking = async (formData) => {
  const response = await axios.post(API_URL + "customBooking ", formData);
  return response.data;
};

const getSingleCustomBooking = async () => {
  const response = await axios.get(`${API_URL}book/getUserSpecificCustom`);
  return response.data;
};
const getAllCustomBookings = async () => {
  const response = await axios.get(`${API_URL}book/getAllCustomBookings`);
  return response.data;
};

const CancelCustomBooking = async (id) => {
  const response = await axios.patch(API_URL + "cancelCustomBooking/" + id);
  return response.data;
};

const getSingleHotelReservation = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/api/v1/rooms/reserve/getSingleReserveHotel`
  );
  return response.data;
};
const getAllHotelReservation = async () => {
  const response = await axios.get(
    `${BACKEND_URL}/api/v1/rooms/reserve/getAllReserveHotel`
  );
  return response.data;
};

const CancelReservation = async (id) => {
  const response = await axios.patch(
    `${BACKEND_URL}/api/v1/rooms/reserve/cancelReservarion/${id}`
  );
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
  createCustomBooking,
  CancelCustomBooking,
  getSingleCustomBooking,
  getAllCustomBookings,
  getSingleHotelReservation,
  getAllHotelReservation,
  CancelReservation,
};
export default packageService;
