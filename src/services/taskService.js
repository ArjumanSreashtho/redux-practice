import http from "./http";

const apiUrl = "/api/tasks";

const saveTask = (formData) => {
  if (formData.id) {
    return http.put(`${apiUrl}/${formData.id}`, formData);
  }
  return http.post(`${apiUrl}`, {...formData, completed: false});
};

const getTasks = ({ pagination, filters }) => {
  return http.get(`${apiUrl}?page=${pagination.page}&total=${pagination.limit}&type=${filters.type}&search=${filters.search}`);
};

const getTask = ({ id }) => {
  return http.get(`${apiUrl}/${id}`);
};

const deleteTask = ({ id }) => {
  return http.delete(`${apiUrl}/${id}`)
}

export default {
  saveTask,
  getTasks,
  getTask,
  deleteTask
};