import axios from "axios";
import routePath from "../constants/routePath";

const refreshTokenApi = "/api/auth/refresh";

axios.interceptors.request.use((config) => {
  if(config.url.includes(routePath.LOGIN) || config.url.includes(routePath.REGISTRATION)) {
    return config;
  }
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
  return config;
}, (error) => {
  return Promise.reject(error);
})

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Reject promise if usual error
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    /*
     * When response code is 401, try to refresh the token.
     * Eject the interceptor so it doesn't loop in case
     * token refresh causes the 401 response
     */
    // axios.interceptors.response.eject(interceptor);

    if (!localStorage.hasOwnProperty("refreshToken")) {
      window.location = "/login";
      return;
    }
    return axios
      .get(refreshTokenApi, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        error.response.config.headers["Authorization"] =
          "Bearer " + response.data.accessToken;
        if (
          error.response.config.method.toLowerCase() === "post" ||
          error.response.config.method.toLowerCase() === "patch" ||
          error.response.config.method.toLowerCase() === "put"
        ) {
          error.response.config.data = JSON.parse(error.response.config.data);
        }
        return axios(error.response.config);
      })
      .catch((error) => {
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      });
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};