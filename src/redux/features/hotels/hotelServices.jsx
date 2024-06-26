import axios from "axios";
import { BACKEND_URL } from "../../../services/authService";

const API_URL = `${BACKEND_URL}/api/v1/hotels/`;
// create new Hotel
const createHotel = async (formData) => {
  const response = await axios.post(`${API_URL}`, formData);
  return response.data;
};
// get all hotel data
const getAllHotels = async (formData) => {
  const response = await axios.get(
    `${API_URL}?city=${formData.city}&min=${formData.min || 1}&max=${formData.max || 999}`
  );
  return response.data;
};
// get single Hotel
const getHotel = async (id) => {
  const response = await axios.get(`${API_URL}/find/${id}`);
  return response.data;
};

// update Hotel
const updateHotel = async (id, formData) => {
  const response = await axios.put(API_URL + id, formData);
  return response.data;
};

// Delete a  hotel
const deleteHotel = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const getHotelRooms = async (id) => {
  const response = await axios.get(`${API_URL}room/${id}`);
  return response.data;
};

const hotelService = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  getHotelRooms,
};

export default hotelService;
