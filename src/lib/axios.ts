import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for global error handling (e.g. logging 401/403)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (typeof window !== "undefined") {
      const status = error.response?.status;
      if (status === 401) {
        localStorage.removeItem("accessToken");
        document.cookie = "accessToken=; path=/; max-age=0";
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      }
      if (status === 500) {
        console.error(
          "Internal Server Error occurred. Please try again later.",
        );
      }
    }
    return Promise.reject(error);
  },
);
