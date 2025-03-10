import axios from "axios";
import { useRouter } from "next/navigation";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Your backend API base URL
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      const router = useRouter();
      router.push("/login"); // Redirect to the login page
    }
    return Promise.reject(error);
  }
);

export default api;
