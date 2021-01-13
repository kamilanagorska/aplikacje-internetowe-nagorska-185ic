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
        <nav className="navbar navbar-expand navbar-light" style={{backgroundColor: '#b3b3cc'}}>
          <a href="/" className="navbar-brand font" style={{fontWeight: 'bold'}}>
            Food Reviewer
          </a>
          <div className="navbar-nav mr-auto font2">
            <li className="nav-item">
              <Link to={"/reviews"} className="nav-link">
                all reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                add new review
              </Link>
            </li>
          </div>
        </nav>

        <div>
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