import http from "../AppUrl";

// const getAll = () => {
//   return http.get("/classes");
// };

// const get = id => {
//   return http.get(`/classes/${id}`);
// };

const create = (data) => {
  //alert(data);
  return http.post("/question-bank", data);
};

// const deleteVersion = id => {
//   return http.delete(`/classes/${id}`);
// };

// const update = (id, data) => {
//   return http.post(`/classes/${id}`, data);
// };

const fileUpdate = (data) => {
  var formData = new FormData();
  formData.append("file_name", data);
  return http.post('upload', formData);
};

const questionService = {
  create,
  fileUpdate,
};

export default questionService;