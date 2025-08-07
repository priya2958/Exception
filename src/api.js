import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "/api",
});

// Global error handler interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract error message from backend
    const errMsg =
      error.response?.data?.error?.message ||
      error.message ||
      "An unexpected error occurred";
    // Optionally, you can use a toast library here
    alert(errMsg); // Replace with toast for production
    return Promise.reject(error);
  }
);

export default api;
