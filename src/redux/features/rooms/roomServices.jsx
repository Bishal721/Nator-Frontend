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
const roomService = {
  createRoom,
  updateRoomAvailability,
};
export default roomService;
