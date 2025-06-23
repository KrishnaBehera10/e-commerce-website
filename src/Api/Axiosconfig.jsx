import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-oeld.onrender.com/",
});

export default instance;
