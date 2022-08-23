import axios from "axios";
import { getCookie } from "./Aurh";

// axios.defaults.baseURL = "https://ecofood1.herokuapp.com";
axios.defaults.baseURL = "http://localhost:4000";

export const getToken = () =>
  localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

axios.defaults.headers.common["Authorization"] = getAuthorizationHeader();

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("token"));

    if (user) {
      config.headers.Authorization = `Bearer ${user}`;
    }

    return config;
  },
  (error) => {
    // console.log("request error", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    alert("An unexpected Error occurred");
  }

  return Promise.reject(error);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
