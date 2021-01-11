import React, { Component } from "react";
//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";

import AddReview from "./components/add-review.component";
import Review from "./components/review.component";
import ReviewsList from "./components/reviews-list.component";
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/reviews" className="navbar-brand">
            bezKoder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/reviews"} className="nav-link">
                Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/reviews"]} component={ReviewsList} />
            <Route exact path="/add" component={AddReview} />
            <Route path="/reviews/:id" component={Review} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
