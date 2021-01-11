import React, { Component } from "react";
import ReviewDataService from "../services/review.service";
import { Link } from "react-router-dom";

export default class ReviewsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchFood = this.onChangeSearchFood.bind(this);
    this.retrieveReviews = this.retrieveReviews.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveReview = this.setActiveReview.bind(this);
    this.removeAllReviews = this.removeAllReviews.bind(this);
    this.searchFood = this.searchFood.bind(this);

    this.state = {
      reviews: [],
      currentReview: null,
      currentIndex: -1,
      searchFood: ""
    };
  }

  componentDidMount() {
    this.retrieveReviews();
  }

  onChangeSearchFood(e) {
    const searchFood = e.target.value;

    this.setState({
      searchFood: searchFood
    });
  }

  retrieveReviews() {
    ReviewDataService.getAll()
      .then(response => {
        this.setState({
          reviews: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveReviews();
    this.setState({
      currentReview: null,
      currentIndex: -1
    });
  }

  setActiveReview(review, index) {
    this.setState({
      currentReview: review,
      currentIndex: index
    });
  }

  removeAllReviews() {
    ReviewDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchFood() {
    ReviewDataService.findByFood(this.state.searchFood)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchFood, reviews, currentReview, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by food name"
              value={searchFood}
              onChange={this.onChangeSearchFood}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchFood}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Reviews List</h4>

          <ul className="list-group">
            {reviews &&
              reviews.map((review, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveReview(review, index)}
                  key={index}
                >
                  {review.food}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllReviews}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentReview ? (
            <div>
              <h4>Review</h4>
              <div>
                <label>
                  <strong>Food:</strong>
                </label>{" "}
                {currentReview.food}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentReview.description}
              </div>
              <div>
                <label>
                  <strong>Score:</strong>
                </label>{" "}
                {currentReview.score}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentReview.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/reviews/" + currentReview.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Review...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}