import React from 'react';
import Topbar from "./components/Topbar"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import WorldPage from "./pages/World"
import PlayerPage from "./pages/Player"
import WelcomePage from './pages/Welcome'
import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Topbar />
          <Switch>
            <Route path="/world" component={WorldPage} />
            <Route path="/player" component={PlayerPage} />
            <Route path="/" component={WelcomePage} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
