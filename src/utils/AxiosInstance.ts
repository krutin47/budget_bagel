import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});


axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    // NOTE:: No Auth As of now
    // TODO :: Add Auth

    // const token = localStorage.getItem("authToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Try again later.");
      }
    } else {
      console.error("Network error. Check your connection.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
