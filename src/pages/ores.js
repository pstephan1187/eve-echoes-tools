import React from 'react';
import { useOres, lastUpdated, ORE_TYPE_COMMON, ORE_TYPE_UNCOMMON, ORE_TYPE_SPECIAL, ORE_TYPE_RARE, ORE_TYPE_PRECIOUS } from '../stores/ores';
import { useMinerals } from '../stores/minerals';
import { reprocessOreByVolume } from "../OreReprocessor";
import Tooltip from "../components/tooltip";
import { useSuperStickyState } from "../utils";
import { useMineralManager } from '../components/mineral-manager';

const OreRow = ({ ore, holdSize, userMinerals }) => {
  const { userOres, setOreValue, resetOreValue } = useOres();
  const colorClass = {
    [ORE_TYPE_COMMON]: 'blue',
    [ORE_TYPE_UNCOMMON]: 'teal',
    [ORE_TYPE_SPECIAL]: 'green',
    [ORE_TYPE_RARE]: 'yellow',
    [ORE_TYPE_PRECIOUS]: 'red'
  }[ore.type];

  ore = userOres.find(userOre => userOre.label === ore.label);

  const volumeValue = Math.round(holdSize / ore.volume * ore.value);
  const reprocessResult = reprocessOreByVolume(ore, holdSize);

  const reprocessedValue = Math.round(
    reprocessResult.reduce((value, mineralUnits) => {
      const userValue = userMinerals.find(userMineral => userMineral.label === mineralUnits.mineral.label).value;
      return value + (userValue * mineralUnits.units)
    }, 0)
  );

  const betterDeal = reprocessedValue > volumeValue ? 'reprocessed' : 'volume';

  return (
    <tr key={ore.label} className={`bg-${colorClass}-200 text-black`}>
      <td className="p-1 text-left">{ore.label}</td>
      <td className="p-1 text-left">{ore.type}</td>
      <td className="p-1 text-right hidden lg:table-cell">[{ore.minSec}] - [{ore.maxSec}] <span className="hidden lg:inline">Security Systems</span></td>
      <td className="p-1 text-right">{ore.volume}<span className="hidden lg:inline">m<sup>3</sup></span></td>
      <td className="p-1 text-right">
        <input
          className="w-20 bg-white px-2 text-right rounded shadow-inner"
          type="number"
          value={ore.value}
          onChange={e => setOreValue(ore.label, e.target.value)}
          onBlur={e => resetOreValue(ore.label, e.target.value)}
        />
        <span className="hidden lg:inline">isk</span>
      </td>
      <td className={`p-1 text-right ${betterDeal === 'volume' ? `bg-${colorClass}-400` : ''}`}>{volumeValue.toLocaleString()}<span className="hidden lg:inline">isk</span></td>
      <td className={`p-1 text-right ${betterDeal === 'reprocessed' ? `bg-${colorClass}-400` : ''}`}>
        <div className="relative group cursor-pointer">
          {reprocessedValue.toLocaleString()}isk<sup><i className="fas fa-question-circle"></i></sup>
          <div className="hidden absolute group-hover:block bg-white p-4 rounded shadow right-0 z-10 text-black">{reprocessResult.map(mineralUnits => {
            return (
              <div key={mineralUnits.mineral.label} className="flex justify-between whitespace-no-wrap">
                <span className="mr-4">{mineralUnits.mineral.label}:</span>
                <span>{mineralUnits.units.toLocaleString()} units</span>
              </div>
            );
          })}</div>
        </div>
      </td>
    </tr>
  );
}

const OreTable = ({ userOres, holdSize, userMinerals }) => {
  return (
    <div className="overflow-x-auto pb-32">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Ore</th>
            <th className="text-left">Type</th>
            <th className="text-right hidden lg:table-cell">Found In</th>
            <th className="text-right">Volume</th>
            <th className="text-right">Unit Value</th>
            <th className="text-right">
              <Tooltip tooltip={`The approximate value of a haul if your entire ${holdSize}m<sup>3</sup> hold was filled with the given ore.`}>Hold Value</Tooltip>
            </th>
            <th className="text-right">
              <Tooltip tooltip={`The approximate value of the resulting minerals if ${holdSize}m<sup>3</sup> of the the given ore were reprocessed.`}>
                Reprocessed Value
                  </Tooltip>
            </th>
          </tr>
        </thead>
        <tbody>
          {userOres.map(ore => (
            <OreRow
              key={ore.label}
              ore={ore}
              holdSize={holdSize}
              userMinerals={userMinerals}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Ores = () => {
  const { userOres } = useOres();
  const { userMinerals } = useMinerals();
  const { MineralManager, openMineralManager } = useMineralManager();
  const [ holdSize, setHoldSize ] = useSuperStickyState(1000, 'holdSize');

  return (
    <div>
      <h2 className="text-4xl mb-4">Ores</h2>

      <p className="mb-4">The values of the ores are not updated automatically. I update them periodically based on approximate market rates of Jita and/or Alikara and additional nearby ITCs. Due to the daily variance of the market, you can set your own values if you'd like.</p>

      <p className="mb-4 p-2 bg-gray-300 font-bold">Values last updated {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString()}.</p>

      <div className="flex justify-between items-center mb-2">
        <div>
          Your hold size: <input type="number" className="py-1 px-2 bg-gray-200 rounded w-20" value={holdSize} onChange={e => setHoldSize(e.target.value)} />m<sup>3</sup>
        </div>
        <div>
          <button className="bg-blue-600 text-blue-100 py-1 px-2 rounded hover:bg-blue-700" onClick={openMineralManager}>Manage mineral values</button>
        </div>
      </div>

      <OreTable
        holdSize={holdSize}
        userOres={userOres}
        userMinerals={userMinerals}
      />

      <MineralManager />
    </div>
  );
}

export default Ores;
