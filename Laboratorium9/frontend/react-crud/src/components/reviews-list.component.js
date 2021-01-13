import React, { Component } from "react";
import ReviewDataService from "../services/review.service";
import { Link } from "react-router-dom";

export default class ReviewsList extends Component {
  //konstruktor
  constructor(props) {
    //zawsze trzeba jak konstruktor
    super(props);
    //związanie metod z instancją komponenentu
    //bind nadpisuje metode przy pomocy zbindowanej funkcji
    //funkcja zostaje niezmienna od powstania komponenntu az do jego zniszczenia
    //zapisuje wprowadzony tekst w formularz, gdy sie zmienia wartosc
    this.onChangeSearchFood = this.onChangeSearchFood.bind(this);
    //pobieranie recenzji wszystkich
    this.retrieveReviews = this.retrieveReviews.bind(this);
    //odswiezanie listy po usunieciu recenzji
    this.refreshList = this.refreshList.bind(this);
    //gdy wcisniemy na recenzje wybierana jest jako aktywna
    this.setActiveReview = this.setActiveReview.bind(this);
    //usuwanie recenzji
    this.removeAllReviews = this.removeAllReviews.bind(this);
    //szukanie
    this.searchFood = this.searchFood.bind(this);

    //stan, zapisuje tutaj to, co bedzie sie zmieniac
    this.state = {
      //tablica recenzji
      reviews: [],
      //aktualnie wybrana recenzja
      currentReview: null,
      //indeks aktualny
      currentIndex: -1,
      //wartosc wpisana w formularz umozliwiajacy wyszukiwanie
      searchFood: ""
    };
  }
  //bez tego nie wyświetlają się recenzje
  componentDidMount() {
    this.retrieveReviews();
  }
  //gdy zmienia się wartość w formularzu umożliwiającym szukanie
  //po nazwie jedzenia, za pomocą ten metody zapisywana jest wartosc
  //z formularza
  onChangeSearchFood(e) {
    const searchFood = e.target.value;

    //zmieniany jest stan, searchFood zdefiniowane w stanie zmienia się na searchFood
    //pobrane z formularza
    //dzięki setState React wie, że zmienil sie stan i moze ponownie wywolac metodę render
    //by dowiedziec sie co powinno zostac wyswietlone na ekranie!!!
    this.setState({
      searchFood: searchFood
    });
  }

  //metoda wykorzystująca metodę getAll zdefiniowaną
  //w pliku review.service.js
  //pobierane są tutaj wszystkie recenzje
  //dane z odpowiedzi podstawiane są pod tablicę reviews
  //zdefiniowaną w stanie
  //dodatkowo pobrane recenzje są wyświetlane
  //w konsoli
  //jeśli pobranie się nie powiedzie wyświetlany jest error
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

  //odświeżenie listy recenzji
  //po usunięciu wszystkich
  //wartości currentReview i currentIndex 
  //są zmieniane na ich początkowe wartości, zdefiniowane
  //na samym początku w stanie
  refreshList() {
    this.retrieveReviews();
    this.setState({
      currentReview: null,
      currentIndex: -1
    });
  }

  //gdy klikniemy na wybraną recenzje
  //jest ona ustawiana jako ta aktywna
  //wtedy currentReview jest ustawiane na tą recenzje
  //a currentIndex na index tej recenzji
  setActiveReview(review, index) {
    this.setState({
      currentReview: review,
      currentIndex: index
    });
  }

  //po kliknięciu guzika Remove All usuuwane są wszystkie recenzje
  //dzieje się to z wykorzystaniem metody deleteAll zdefiniowanej w review.service.js
  //nowa pusta tablica jest wyświetlana w konsoli
  //a lista w aplikacji jest odświeżana
  //jeśli nie uda się usunąć to w konsoli zwracany jest error
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

  //wykonywana po kliknięciu guzika Search
  //wykorzystuje metode findByFood zdefiniowaną w review.service.js
  //pod reviews zdefiniowane w stanie podstawiane sa dane z otrzymanej
  //odpowiedzi
  //dodatkowo w konsoli zwracana jest tablica recenzji spelniających
  //wymaganie zdefiniowane w wyszukiwaniu np ze ma w sobie "ma"
  //jesli wyszukiwanie sie nie uda to error w konsoli
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