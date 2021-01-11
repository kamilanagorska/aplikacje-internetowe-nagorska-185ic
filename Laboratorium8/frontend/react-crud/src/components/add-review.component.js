import React, { Component } from "react";
import ReviewDataService from "../services/review.service";

export default class AddReview extends Component {
  constructor(props) {
    super(props);
    this.onChangeFood = this.onChangeFood.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.saveReview = this.saveReview.bind(this);
    this.newReview = this.newReview.bind(this);

    this.state = {
      id: null,
      food: "",
      description: "", 
      score: 0,
      published: false,
      submitted: false
    };
  }

  onChangeFood(e) {
    this.setState({
      food: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeScore(e) {
      this.setState({
          score: e.target.value
      });
  }

  saveReview() {
    var data = {
      food: this.state.food,
      description: this.state.description,
      score: this.state.description
    };

    ReviewDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          food: response.data.food,
          description: response.data.description,
          score: response.data.score,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newReview() {
    this.setState({
      id: null,
      food: "",
      description: "",
      score: 0,
      published: false,
      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newReview}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="food">Food</label>
                <input
                  type="text"
                  className="form-control"
                  id="food"
                  required
                  value={this.state.food}
                  onChange={this.onChangeFood}
                  name="food"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="score">Score</label>
                <input
                  type="number"
                  className="form-control"
                  id="score"
                  required
                  value={this.state.score}
                  onChange={this.onChangeScore}
                  name="score"
                />
              </div>
  
              <button onClick={this.saveReview} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}