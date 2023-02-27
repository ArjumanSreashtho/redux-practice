import http from "./http";

const apiUrl = "/api/users";

const saveUser = (formData) => {
  if (formData.id) {
    return http.put(`${apiUrl}/${formData.id}`, formData);
  }
  return http.post(`${apiUrl}`, {...formData, completed: false});
};

const getWorkableUsers = () => {
  return http.get(`${apiUrl}/workable`);
};

const getUserProfile = () => {
  return http.get(`${apiUrl}/profile`);
};

const deleteUser = ({ id }) => {
  return http.delete(`${apiUrl}/${id}`)
}

export default {
  saveUser,
  getWorkableUsers,
  getUserProfile,
  deleteUser
};