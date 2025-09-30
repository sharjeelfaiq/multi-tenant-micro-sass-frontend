import axios, { AxiosRequestConfig, Method } from "axios";

const baseURL = import.meta.env.VITE_API_URL;

// Create optimized axios instance
const httpClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth accessToken
httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const requestAPI = <T = any>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  return httpClient.request<T>({
    method,
    url,
    data,
    ...config,
  });
};