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
          reviews: response.data
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
      <div className="font2">
          <div className="input-group" style={{width:'70%', paddingTop: '20px', margin: '0 auto', paddingBottom: '20px'}}>
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
        <div className="card" style={{width:'65%', margin:'0 auto', backgroundColor: '#f0f0f5'}}>
        <div>
          <p className="font text-center" style={{fontSize: '50px'}}>Reviews List</p>
          <p className="text-center">Click on review to see details</p>

          <div>
          {currentReview ? (
            <div className="card" style={{padding: '20px', width: '80%', margin:'0 auto'}}>
              <p className="font" style={{fontSize: '30px'}}>{currentReview.food}</p>
              <div>
                <label>
                  <strong>description:</strong>
                </label>{" "}
                {currentReview.description}
              </div>
              <div>
                <label>
                  <strong>score:</strong>
                </label>{" "}
                {currentReview.score}
              </div>
              <div>
                <label>
                  <strong>status:</strong>
                </label>{" "}
                {currentReview.published ? "published" : "pending"}
              </div>

              <Link
                to={"/reviews/" + currentReview.id}
                className="badge badge-secondary"
                style={{width:'20%'}}
              >
                Edit
              </Link>
            </div>

          ) : (
            <div>
            </div>
          )}
        </div>

          <ul className="list-group" style={{paddingTop: '15px'}}>
            {reviews &&
              reviews.map((review, index) => (
                <li
                  className={
                    "list-group-item list-group-item-action list-group-item-light " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveReview(review, index)}
                  key={index}
                  style={{width:'70%', margin: '0 auto'}}
                >
                  {review.food}
                </li>
              ))}
          </ul>

          <button
            className="btn btn-outline-secondary"
            onClick={this.removeAllReviews}
            style={{marginLeft: '45%', marginTop:'15px', marginBottom: '30px'}}
          >
            Remove All
          </button>
        </div>

        </div>
      </div>
    );
  }
}