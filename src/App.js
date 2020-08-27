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
      <nav className="bg-gray-300">
        <div className="container mx-auto flex justify-between items-center px-2">
          <h1 className="color-gray-800 text-2xl px-2 py-2">Eve Echoes Utilities</h1>
          <div>
            <Link className="px-2 py-2 hover:bg-gray-400" to="/">Home</Link>
            <Link className="px-2 py-2 hover:bg-gray-400" to="/ores">Ores</Link>
          </div>
        </div>
      </nav>

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

function Home() {
  return (
    <div>
      <p className="pb-4">This is a set of tools that I have put together to help me progress through the Eve Echoes universe. I am sharing them here to help anyone else who might find them valuable.</p>

      <p className="pb-4">If you would like to contribute to this set of tools, you can do so here: <a className="text-blue-700 underline" target="blank" rel="noreferer noopener" href="https://github.com/pstephan1187/eve-echoes-tools">Github</a></p>
    </div>
  );
}

function Ores() {
  return (
    <div>
      <h2 className="text-4xl pb-4">Ores</h2>

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
