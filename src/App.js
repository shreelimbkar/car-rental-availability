import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/styles.scss";
import Home from "./pages/Home";
import CarInfo from "./pages/CarInfo";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/car-details" component={CarInfo} />
          <Route path="/" component={Home} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
