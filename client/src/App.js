import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SaveBooks from "./pages/SaveBooks";
import SearchBooks from "./pages/SearchBooks";
import SearchBooks1 from "./pages/SearchBooks1";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import "./App.css"
import Navbar from './components/navbar'
import Home from './components/home'
import MyWatcher from "./pages/MyWatcher1";


function App() {
  return (
    
    <Router>
      <div>
      <Nav />
        <Switch>
        <Route exact path="/" component={Home} />

          <Route exact path="/search" component={SearchBooks} />

          <Route exact path="/watcher" component={MyWatcher} />

          <Route exact path="/cc" component={SearchBooks1} />
          <Route exact path="/saved" component={SaveBooks} />
          <Route exact path="/saved/:id" component={SaveBooks} />
          <Route component={NoMatch} /> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
