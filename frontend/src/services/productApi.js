import axios from "axios";

const productAPI = axios.create({
  baseURL: "http://localhost:4000/api/products",
  withCredentials: true
});

export default productAPI;
