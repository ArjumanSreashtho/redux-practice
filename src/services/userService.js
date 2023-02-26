import http from "./http";

const apiUrl = "/api/users";

const saveUser = (formData) => {
  if (formData.id) {
    return http.put(`${apiUrl}/${formData.id}`, formData);
  }
  return http.post(`${apiUrl}`, {...formData, completed: false});
};

const getUsers = ({ pagination, filters }) => {
  return http.get(`${apiUrl}?page=${pagination.page}&total=${100}&type=${filters.type}&search=${filters.search}`);
};

const getUser = ({ id }) => {
  return http.get(`${apiUrl}/${id}`);
};

const deleteUser = ({ id }) => {
  return http.delete(`${apiUrl}/${id}`)
}

export default {
  saveUser,
  getUsers,
  getUser,
  deleteUser
};