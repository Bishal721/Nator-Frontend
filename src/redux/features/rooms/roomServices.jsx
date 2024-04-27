import axios from "axios";
import { BACKEND_URL } from "../../../services/authService";
const API_URL = `${BACKEND_URL}/api/v1/rooms/`;

const createRoom = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};
const updateRoomAvailability = async (id, formdata) => {
  const response = await axios.put(`${API_URL}availability/${id}`, formdata);
  return response.data;
};

const updateRoom = async ({ id, formData }) => {
  const response = await axios.put(API_URL + id, formdata);
  return response.data;
};

const deleteRoom = async ({ id, HotelId }) => {
  const response = await axios.delete(API_URL + id + HotelId);
  return response.data;
};

const getRoom = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const getAllRooms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const roomService = {
  createRoom,
  updateRoomAvailability,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
};
export default roomService;
