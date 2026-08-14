
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/auth/users",
  withCredentials:true
});

export default API;

