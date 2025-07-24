import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? `${import.meta.env.BACKEND_URL}/api/v1`
      : "http://localhost:8080/api/v1",
  withCredentials: true,
});
