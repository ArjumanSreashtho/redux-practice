import http from "./http";
import jwtDecode from "jwt-decode";

const apiUrl = "/api/auth/login";

const login = async (formData) => {
  const response = await http.post(apiUrl, formData);
  const { data: { accessToken } } = response;
  localStorage.setItem("accessToken", accessToken);
  return response;
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location = "/login";
};

const getCurrentUser = () => {
  const accessToken = localStorage.getItem("accessToken");
  const result = jwtDecode(accessToken);
  return result;
};

const currentTokenStatus = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return false;
  }
  const result = jwtDecode(accessToken);
  return !(Date.now() >= result.exp * 1000);
};

export default {
  currentTokenStatus,
  getCurrentUser,
  login,
  logout,
};