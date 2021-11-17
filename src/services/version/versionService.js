import http from "../AppUrl";

const getAll = () => {
  return http.get("/version");
};

const get = id => {
  return http.get(`/version/${id}`);
};

const create = data => {
  //alert(data);
  return http.post("/version", data);
};

const deleteVersion = id => {
  return http.delete(`/version/${id}`);
};

const update = (id, data) => {
  return http.put(`/version/${id}`, data);
};

const VersionService = {
  getAll,
  get,
  create,
  deleteVersion,
  update,
};

export default VersionService;