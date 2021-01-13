import http from "../http-common";

class ReviewDataService {
  getAll() {
    return http.get("/reviews");
  }

  get(id) {
    return http.get(`/reviews/${id}`);
  }

  create(data) {
    return http.post("/reviews", data);
  }

  update(id, data) {
    return http.put(`/reviews/${id}`, data);
  }

  delete(id) {
    return http.delete(`/reviews/${id}`);
  }

  deleteAll() {
    return http.delete(`/reviews`);
  }

  findByFood(food) {
    return http.get(`/reviews?food=${food}`);
  }
}

export default new ReviewDataService();