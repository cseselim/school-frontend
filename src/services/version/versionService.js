import http from "../AppUrl";

const getAll = () => {
  return http.get("/version");
};

const get = id => {
  return http.get(`/version/${id}`);
};

const create = data => {
  return http.post("/version", data);
};

const update = (id, data) => {
  return http.put(`/version/${id}`, data);
};

const VersionService = {
  getAll,
  get,
  create,
  update,
};

export default VersionService;