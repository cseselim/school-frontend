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

const questionService = {
  create,
};

export default questionService;