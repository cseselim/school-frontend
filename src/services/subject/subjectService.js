import http from "../AppUrl";

const getAll = () => {
  return http.get("/subject");
};

const get = id => {
  return http.get(`/subject/${id}`);
};

const create = data => {
  //alert(data);
  return http.post("/subject", data);
};

const deleteSubject = id => {
  return http.delete(`/subject/${id}`);
};

const update = (id, data) => {
  return http.post(`/subject/${id}`, data);
};

const fileUpdate = (data) => {
  var formData = new FormData();
  formData.append("file_name", data);
  return http.post('upload', formData);
};

const subjectService = {
  getAll,
  get,
  create,
  deleteSubject,
  update,
  fileUpdate
};

export default subjectService;