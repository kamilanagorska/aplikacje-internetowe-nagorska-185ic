import React, { Component } from "react";
import ReviewDataService from "../services/review.service";

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.onChangeFood = this.onChangeFood.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.getReview = this.getReview.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateReview = this.updateReview.bind(this);
    this.deleteReview = this.deleteReview.bind(this);

    this.state = {
      currentReview: {
        id: null,
        title: "",
        description: "",
        score: 0,
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getReview(this.props.match.params.id);
  }

  onChangeFood(e) {
    const food = e.target.value;

    this.setState(function(prevState) {
      return {
        currentReview: {
          ...prevState.currentReview,
          food: food
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentReview: {
        ...prevState.currentReview,
        description: description
      }
    }));
  }

  onChangeScore(e) {
      const score = e.target.value;

      this.setState(prevState => ({
          currentReview: {
              ...prevState.currentReview,
              score: score
          }
      }));
  }

  getReview(id) {
    ReviewDataService.get(id)
      .then(response => {
        this.setState({
          currentReview: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentReview.id,
      title: this.state.currentReview.food,
      description: this.state.currentReview.description,
      score: this.state.currentReview.score,
      published: status
    };

    ReviewDataService.update(this.state.currentReview.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentReview: {
            ...prevState.currentReview,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateReview() {
    ReviewDataService.update(
      this.state.currentReview.id,
      this.state.currentReview
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The review was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteReview() {    
    ReviewDataService.delete(this.state.currentReview.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/reviews')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentReview } = this.state;

    return (
      <div className="font2">
        {currentReview ? (
          <div className="card" style={{width:'65%', margin:'0 auto', backgroundColor: '#f0f0f5', marginTop: '20px'}}>
            <p className="font text-center" style={{fontSize: '50px'}}>Review</p>
            <form style={{margin: '0 auto', width:'70%'}}>
              <div className="form-group">
                <label htmlFor="food">name of food:</label>
                <input
                  type="text"
                  className="form-control"
                  id="food"
                  value={currentReview.tfood}
                  onChange={this.onChangeFood}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentReview.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="score">score (0-10):</label>
                <input
                  type="number"
                  className="form-control"
                  id="score"
                  value={currentReview.score}
                  onChange={this.onChangeScore}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>status: </strong>
                </label>
                {currentReview.published ? " published" : " pending"}
              </div>
            </form>

            {currentReview.published ? (
              <button
                className="btn btn-outline-secondary"
                onClick={() => this.updatePublished(false)}
                style={{margin: '0 auto', width:'20%', marginBottom:'10px'}}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-outline-secondary"
                onClick={() => this.updatePublished(true)}
                style={{margin: '0 auto', width:'20%', marginBottom:'10px'}}
              >
                Publish
              </button>
            )}

            <button
              className="btn btn-outline-secondary"
              onClick={this.deleteReview}
              style={{margin: '0 auto', width:'20%', marginBottom:'10px'}}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-outline-secondary"
              onClick={this.updateReview}
              style={{margin: '0 auto', width:'20%', marginBottom:'10px'}}
            >
              Update
            </button>
            <p className="text-center" style={{fontSize:'25px'}}>{this.state.message}</p>
          </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    );
  }
}