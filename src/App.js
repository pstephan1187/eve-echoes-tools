import React from 'react';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import Ores from "./pages/ores";
import Home from "./pages/home";

import Nav from "./components/nav";

var history = createBrowserHistory();

history.listen((location) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search
    })
  }
});

function App() {
  return (
    <Router history={ history }>
      <Nav />

      <section className="container mx-auto p-4">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/ores">
            <Ores />
          </Route>
        </Switch>
      </section>
    </Router>
  );
}

export default App;
