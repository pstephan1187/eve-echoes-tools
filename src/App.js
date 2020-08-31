import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { ores, lastUpdateTimestamp, ORE_TYPE_COMMON, ORE_TYPE_UNCOMMON, ORE_TYPE_RARE, ORE_TYPE_VERY_RARE } from './stores/ores';
import { reprocessOreByVolume } from "./OreReprocessor";

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
      <p className="mb-4">This is a set of tools that I have put together to help me progress through the Eve Echoes universe. I am sharing them here to help anyone else who might find them valuable. Current tools available:</p>

      <ul className="mb-4 ml-4 list-disc">
        <li><Link className="font-bold text-blue-700 underline hover:text-blue-800" to="/ores">Ore Value by volume calculations</Link> to help determine which ore will produce the most value <strong>per haul</strong> if you sell the ore directly on the market</li>
      </ul>

      <p className="mb-4">If you would like to contribute to this set of tools, you can do so here: <a className="text-blue-700 underline" target="blank" rel="noreferer noopener" href="https://github.com/pstephan1187/eve-echoes-tools">Github</a></p>
    </div>
  );
}

function Ores() {
  const orgOres = JSON.parse(JSON.stringify(ores));
  const [userOres, setUserOres] = useState(orgOres);
  const lastUpdated = new Date();

  lastUpdated.setUTCFullYear(lastUpdateTimestamp[0]);
  lastUpdated.setUTCMonth(lastUpdateTimestamp[1] - 1);
  lastUpdated.setUTCDate(lastUpdateTimestamp[2]);
  lastUpdated.setUTCHours(lastUpdateTimestamp[3] + (lastUpdated.getTimezoneOffset() / 60));
  lastUpdated.setUTCMinutes(lastUpdateTimestamp[4]);
  lastUpdated.setUTCSeconds(0);

  const setOreValue = (oreName, newValue) => {
    const newOreValues = JSON.parse(JSON.stringify(userOres))

    for (const i in newOreValues) {
      if (newOreValues[i].label === oreName) {
        newOreValues[i].value = newValue;
      }
    }

    setUserOres(newOreValues);
  }

  const resetOreValue = (oreName, newValue) => {
    const newOreValues = JSON.parse(JSON.stringify(userOres))

    if (newValue === null || newValue === '') {
      for (const i in ores) {
        if (ores[i].label === oreName) {
          console.log(newValue, ores[i].value);
          newValue = ores[i].value;
        }
      }

      for (const i in newOreValues) {
        if (newOreValues[i].label === oreName) {
          newOreValues[i].value = newValue;
        }
      }
    }

    setUserOres(newOreValues);
  }

  return (
    <div className="mb-32">
      <h2 className="text-4xl mb-4">Ores</h2>

      <p className="mb-4">The values of the ores are not updated automatically. I will update them periodically based on approximate market rates of Jita and/or Alikara and additional ITCs. Due to the daily variance of the market, you can set your own values if you'd like.</p>

      <p className="mb-4 p-2 bg-gray-300 font-bold">Values last updated {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString()}.</p>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Ore</th>
            <th className="text-left">Type</th>
            <th className="text-right">Found In</th>
            <th className="text-right">Volume</th>
            <th className="text-right">Aprx Value / Unit</th>
            <th className="text-right">Aprx Value / 1000m<sup>3</sup></th>
            <th className="text-right">Aprx Reprocessed Value / 1000m<sup>3</sup></th>
          </tr>
        </thead>
        <tbody>
          {userOres.map(ore => {
            const colorClass = {
              [ORE_TYPE_COMMON]: 'bg-green-200',
              [ORE_TYPE_UNCOMMON]: 'bg-yellow-200',
              [ORE_TYPE_RARE]: 'bg-orange-200',
              [ORE_TYPE_VERY_RARE]: 'bg-red-200'
            }[ore.type];

            const volumeValue = Math.round(1000 / ore.volume * ore.value);
            const reprocessResult = reprocessOreByVolume(ore, 1000);

            const reprocessedValue = Math.round(
              reprocessResult.reduce((value, mineralUnits) => {
                return value + (mineralUnits.mineral.value * mineralUnits.units)
              }, 0)
            );

            return (
              <tr key={ore.label} className={ `${colorClass}` }>
                <td className="p-1 text-left">{ore.label}</td>
                <td className="p-1 text-left">{ore.type}</td>
                <td className="p-1 text-right">[{ore.minSec}] - [{ore.maxSec}] Security Systems</td>
                <td className="p-1 text-right">{ore.volume}m<sup>3</sup></td>
                <td className="p-1 text-right">
                  <input
                    className="w-20 bg-white px-2 text-right"
                    type="number"
                    value={ore.value}
                    onChange={e => setOreValue(ore.label, e.target.value)}
                    onBlur={e => resetOreValue(ore.label, e.target.value)}
                  />
                isk
              </td>
                <td className="p-1 text-right">{ volumeValue.toLocaleString() }isk</td>
                <td className="p-1 text-right">
                  <div className="relative group cursor-pointer">
                    {reprocessedValue.toLocaleString()}isk<sup><i class="fas fa-question-circle"></i></sup>
                    <div className="hidden absolute group-hover:block bg-white p-4 rounded shadow right-0 z-10">{reprocessResult.map(mineralUnits => (
                      <div key={mineralUnits.mineral.label} className="flex justify-between">
                        <span className="mr-4">{mineralUnits.mineral.label}:</span>
                        <span>{mineralUnits.units.toLocaleString()} units</span>
                      </div>
                    ))}</div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
