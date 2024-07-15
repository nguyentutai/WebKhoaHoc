import axios from "axios";
const instans = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});

export default instans;
