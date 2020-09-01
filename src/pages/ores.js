import React, { useState } from 'react';
import { ores, lastUpdateTimestamp, ORE_TYPE_COMMON, ORE_TYPE_UNCOMMON, ORE_TYPE_RARE, ORE_TYPE_VERY_RARE } from '../stores/ores';
import { reprocessOreByVolume } from "../OreReprocessor";

export default function Ores() {
  const orgOres = JSON.parse(JSON.stringify(ores));
  const [userOres, setUserOres] = useState(orgOres);
  const [holdSize, setHoldSize] = useState(1000);
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

      Your hold size: <input type="number" className="py-1 px-2 bg-gray-200 rounded" value={holdSize} onChange={e => setHoldSize(e.target.value)}/>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Ore</th>
            <th className="text-left">Type</th>
            <th className="text-right">Found In</th>
            <th className="text-right">Volume</th>
            <th className="text-right">Aprx Value / Unit</th>
            <th className="text-right">Aprx Value / {holdSize}m<sup>3</sup></th>
            <th className="text-right">Aprx Reprocessed Value / {holdSize}m<sup>3</sup></th>
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

            const volumeValue = Math.round(holdSize / ore.volume * ore.value);
            const reprocessResult = reprocessOreByVolume(ore, holdSize);

            const reprocessedValue = Math.round(
              reprocessResult.reduce((value, mineralUnits) => {
                return value + (mineralUnits.mineral.value * mineralUnits.units)
              }, 0)
            );

            return (
              <tr key={ore.label} className={`${colorClass}`}>
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
                <td className="p-1 text-right">{volumeValue.toLocaleString()}isk</td>
                <td className="p-1 text-right">
                  <div className="relative group cursor-pointer">
                    {reprocessedValue.toLocaleString()}isk<sup><i className="fas fa-question-circle"></i></sup>
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
