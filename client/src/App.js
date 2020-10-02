import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// components
import { Header } from "./components";
// pages
import { Home, Titles, Search, Browse, Stream } from "./pages";
const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/titles/:id" exact component={Titles} />
          <Route path="/stream/:id" exact component={Stream} />
          <Route path="/search" exact component={Search} />
          <Route path="/browse" exact component={Browse} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
