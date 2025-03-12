import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    );
    return true; // No need to manually store the new token
  } catch (error) {
    console.error("Failed to refresh token:", error);
    window.location.href = "/login"; // Redirect to login
    return false;
  }
};

// Response interceptor to handle token expiration and auto-refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
