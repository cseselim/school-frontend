import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/v1/api",
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});
