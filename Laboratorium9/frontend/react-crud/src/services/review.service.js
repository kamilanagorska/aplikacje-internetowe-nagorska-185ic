import http from "../http-common";

class ReviewDataService {
  //pobranie wszystkich recenzji
  getAll() {
    return http.get("/reviews");
  }

  //pobranie recenzji o konkretnym id
  get(id) {
    return http.get(`/reviews/${id}`);
  }

  //tworzenie nowej recenzji
  create(data) {
    return http.post("/reviews", data);
  }

  //edycja recenzji o konretnym id
  update(id, data) {
    return http.put(`/reviews/${id}`, data);
  }

  //usutwanie recenzji o konkretnym id
  delete(id) {
    return http.delete(`/reviews/${id}`);
  }

  //usuwanie wszyskich recenzji
  deleteAll() {
    return http.delete(`/reviews`);
  }

  //znajdowanie recenzji o podanym food
  findByFood(food) {
    return http.get(`/reviews?food=${food}`);
  }
}

export default new ReviewDataService();