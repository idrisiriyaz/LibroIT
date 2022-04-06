import Axios from "axios";
import { Server } from "../../global";

export const getProfileByUserId = (userId) => Axios.get(`${Server.BASE_URL}/users/${userId}/profile`);

export const loadUserImage = (userId) => Axios.get(`${Server.BASE_URL}/users/${userId}/userImage?${Date.now()}`);