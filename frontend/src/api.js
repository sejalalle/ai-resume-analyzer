import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-analyzer-1-m292.onrender.com/api"
});

export default API;