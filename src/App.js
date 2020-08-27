import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { ores } from './stores/ores';

function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/ores">Ores</Link>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/ores">
          <Ores />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Ores() {
  return (
    <div>
      <h2>Ores</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Ore</th>
            <th className="text-left">Type</th>
            <th className="text-right">Found In</th>
            <th className="text-right">Volume</th>
            <th className="text-right">Aprx Value / Unit</th>
            <th className="text-right">Aprx Value / 1000m<sup>3</sup></th>
          </tr>
        </thead>
        <tbody>
          {ores.map(ore => (
            <tr>
              <td className="text-left">{ore.label}</td>
              <td className="text-left">{ore.type}</td>
              <td className="text-right">[{ore.minSec}] - [{ore.maxSec}] Security Systems</td>
              <td className="text-right">{ore.volume}m<sup>3</sup></td>
              <td className="text-right">{ore.value}isk</td>
              <td className="text-right">{Math.round(1000 / ore.volume * ore.value).toLocaleString()}isk</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
