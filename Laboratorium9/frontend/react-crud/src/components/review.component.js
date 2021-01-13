import React, { Component } from "react";
import ReviewDataService from "../services/review.service";

export default class Review extends Component {
  constructor(props) {
    super(props);
    //gdy zmieni sie wartosc w formularzu name of food
    this.onChangeFood = this.onChangeFood.bind(this);
    //gdy zmieni sie wartosc w formularzu description
    this.onChangeDescription = this.onChangeDescription.bind(this);
    //gdy zmieni sie wartosc w formularzu score
    this.onChangeScore = this.onChangeScore.bind(this);
    //pobiera wybraną recenzje
    this.getReview = this.getReview.bind(this);
    //zmiana wartosci published recenzji
    this.updatePublished = this.updatePublished.bind(this);
    //zedytowanie recenzji
    this.updateReview = this.updateReview.bind(this);
    //usunięcie recenzji
    this.deleteReview = this.deleteReview.bind(this);

    this.state = {
      //aktualnie wybrana recenzja
      currentReview: {
        id: null,
        title: "",
        description: "",
        score: 0,
        published: false
      },
      //wiadomosc wyswietlana np po zedytowaniu recenzji
      message: ""
    };
  }

  //pobiera wartosci aktualnie wybranej recenzji
  componentDidMount() {
    this.getReview(this.props.match.params.id);
  }

  //gdy zmieni sie wartosc w formularzu pobierana jest 
  //ta wartosc
  onChangeFood(e) {
    const food = e.target.value;

    //bieżacy stan zastępujemy paramentrami
    //ostatniego stanu prevState
    //pod currentReview podstawiamy
    //wartosc currentReview poprzedniego stanu
    //wszystko zostaje takie jak poprzedmio
    //zmieniamy tylko food na nowe food
    //pobrane z formularza
    this.setState(function(prevState) {
      return {
        currentReview: {
          ...prevState.currentReview,
          food: food
        }
      };
    });
  }

//gdy zmieniana jest wartosc w formularzu z description
//dziala tak samo jak onChangeFood ale z description zamiast food
  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentReview: {
        ...prevState.currentReview,
        description: description
      }
    }));
  }

//gdy zmieniana jest wartosc w formularzu z score
//dziala tak samo jak onChangeFood ale z score zamiast food
  onChangeScore(e) {
      const score = e.target.value;

      this.setState(prevState => ({
          currentReview: {
              ...prevState.currentReview,
              score: score
          }
      }));
  }

  //pobieranie recenzji
  //wywolywane przez componentDidMount()
  //wykorzystuje metode get(id) z pliku
  //review.service.js
  //dodatkowo wypisuje pobraną recenzje w konsoli
  //wypisuje blad jak nidpowodzenie
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

  //zmiania statusu published na true albo false
  //wywolywana po wcisnieciu guzika publish lub unpublish
  updatePublished(status) {
    var data = {
      id: this.state.currentReview.id,
      title: this.state.currentReview.food,
      description: this.state.currentReview.description,
      score: this.state.currentReview.score,
      published: status
    };
    //wykorzystuje metode update z review.service.js
    //bieżacy stan zastępujemy paramentrami
    //ostatniego stanu prevState
    //pod currentReview podstawiamy
    //wartosc currentReview poprzedniego stanu
    //wszystko zostaje takie jak poprzedmio
    //zmieniamy tylko wartosc published
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
  
  //wykonywana po wcisnieciu guzika Update
  //wykorzystuje metode update z review.service.js
  //zmienia stan
  //pod message podstawia wiadomosc, ktora jest wyswietlana
  //na stronie po udanym zedydowaniu recenzji
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

  //usuwa wybraną recenzje
  //wykorzystuje metode delete z review.service.js
  //wykonywana po wcisnieciu guzika Delete
  deleteReview() {    
    ReviewDataService.delete(this.state.currentReview.id)
      .then(response => {
        console.log(response.data);
        //history.push umieszcza nowy wpis na stosie historii
        //czyli zostajemy przekierowani na inną trase
        //idziemy do /reviews
        //czyli do podstrony z listą recenzji
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