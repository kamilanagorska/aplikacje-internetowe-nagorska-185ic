import React, { Component } from "react";
import ReviewDataService from "../services/review.service";
import { Link } from "react-router-dom";

export default class AddReview extends Component {
  constructor(props) {
    super(props);
    //zmiany wartosci w formularzu
    this.onChangeFood = this.onChangeFood.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    //zapisanie nowej recenzji
    this.saveReview = this.saveReview.bind(this);
    //zmiana stanu na początkowy
    this.newReview = this.newReview.bind(this);

    this.state = {
      id: null,
      food: "",
      description: "", 
      score: 0,
      published: false,
      //false gdy nie zapiszemy naszej nowej recenzji
      //po zmianie statusu na true wyswietla sie co innego na stronie
      submitted: false
    };
  }

  //gdy zmienia sie wartosc w formularzu
  //zapisuja wartosc z formularza
  //zmieniają stan
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

  //tworzenie nowej recenzji
  //zapisywanie jej
  saveReview() {
    //utworzenie obiektu o wartosciach
    //zapisanych w stanie
    //food, description,score
    var data = {
      food: this.state.food,
      description: this.state.description,
      score: this.state.score
    };

    //wykorzystanie metody create z pliku
    //review.service.js
    //zmieniany jest stan
    //podstawiane są wartosci nowej recenzji
    //submitted zmienia sie na true, co powoduje zmienienie
    //wyswietlanych rzeczy na stronie
    //w konsoli wyswietlana jest nowa recenzja
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

  //wykonywana po wcisnieciu guzika add more
  //"czyszczenie" stanu, by moc utworzyc nową recenzje
  //stan musi byc do tego czysty, czyli musi miec
  //wartosci takie, jakie mial na samym poczatku
  //przed stworzeniem nowej recenzji
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
        <div  className="card font2" style={{width:'65%', margin:'0 auto', backgroundColor: '#f0f0f5', marginTop:'20px'}}>
          {this.state.submitted ? (
            <div>
              <p className="text-center font2" style={{fontSize:'25px', paddingTop: '10px'}}>You submitted successfully!</p>
              <button className="btn btn-outline-secondary" onClick={this.newReview} style={{width:'20%', marginBottom:'30px', marginTop:'20px', marginLeft:'40%'}}>
                Add more
              </button>
              <Link
                to={"/reviews"}
                className="btn btn-outline-secondary"
                style={{width:'20%', marginBottom:'30px', marginTop:'10px', marginLeft:'40%'}}
              >
                All reviews
              </Link>
            </div>
          ) : (
            <div>
              <p className="font text-center" style={{fontSize: '50px'}}>Add review</p>
              <div className="form-group" style={{margin: '0 auto', width:'70%'}}>
                <label htmlFor="food">name of food:</label>
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
  
              <div className="form-group" style={{margin: '0 auto', width:'70%'}}>
                <label htmlFor="description">description:</label>
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

              <div className="form-group" style={{margin: '0 auto', width:'70%'}}>
                <label htmlFor="score">score (0-10):</label>
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
  
              <button onClick={this.saveReview} className="btn btn-outline-secondary" style={{width:'20%', marginBottom:'30px', marginTop:'20px', marginLeft:'40%'}}>
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}