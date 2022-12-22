import axios from "axios";
import Toastify from "toastify-js";

const axiosInstance = axios.create({
  baseURL: "http://43.204.40.108:8081/api/v1/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "access-control-allow-origin": "*"
  }
});
/*
localhost , 43.204.40.108 , 15.207.47.158
});*/// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    window.open("/login", "_self");
  } else {
    return null;
  }
  return error;
});

export default axiosInstance;
