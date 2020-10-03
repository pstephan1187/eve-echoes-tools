import React, { useState, useReducer } from 'react';
import { useOres, ORE_TYPE_COMMON, ORE_TYPE_UNCOMMON, ORE_TYPE_SPECIAL, ORE_TYPE_RARE, ORE_TYPE_PRECIOUS } from '../stores/ores';
import { lastUpdated } from '../MarketValues';
import { useMinerals } from '../stores/minerals';
import { useOreReprocessor } from "../OreReprocessor";
import Tooltip from "../components/tooltip";
import { useSuperStickyState } from "../utils";
import MineralManager from '../components/mineral-manager';
import SkillManager from '../components/skill-manager';

const OreRow = ({ ore, holdSize, userMinerals }) => {
  const { ores, setOreValue, resetOreValue } = useOres();
  const { reprocessOreByVolume, getOreReprocessingModifier } = useOreReprocessor();
  const modifier = getOreReprocessingModifier(ore);
  const colorClass = {
    [ORE_TYPE_COMMON]: 'blue',
    [ORE_TYPE_UNCOMMON]: 'teal',
    [ORE_TYPE_SPECIAL]: 'green',
    [ORE_TYPE_RARE]: 'yellow',
    [ORE_TYPE_PRECIOUS]: 'red'
  }[ore.type];

  ore = ores.find(userOre => userOre.label === ore.label);

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
          onChange={e => setOreValue(ore, e.target.value)}
          onBlur={e => resetOreValue(ore, e.target.value)}
        />
        <span className="hidden lg:inline">isk</span>
      </td>
      <td className="p-1 text-right hidden lg:table-cell">{modifier * 100}%</td>
      <td className={`p-1 text-right ${betterDeal === 'volume' ? `bg-${colorClass}-400` : ''}`}>{volumeValue.toLocaleString()}<span className="hidden lg:inline">isk</span></td>
      <td className={`p-1 text-right ${betterDeal === 'reprocessed' ? `bg-${colorClass}-400` : ''}`}>
        <div className="relative group cursor-pointer">
          {reprocessedValue.toLocaleString()}isk<sup><i className="fas fa-question-circle"></i></sup>
          <div className="hidden absolute group-hover:block bg-white p-4 rounded shadow right-0 z-10 text-black">{reprocessResult.map(mineralUnits => {
            return (
              <div key={mineralUnits.mineral.label} className="flex justify-between whitespace-no-wrap">
                <span className="mr-4">{mineralUnits.mineral.label}:</span>
                <span className="mr-4">@{modifier * 100}%</span>
                <span>{mineralUnits.units.toLocaleString()} units</span>
              </div>
            );
          })}</div>
        </div>
      </td>
    </tr>
  );
}

const OreTable = ({ holdSize }) => {
  const { minerals } = useMinerals();
  const { ores } = useOres();

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
            <th className="text-right hidden lg:table-cell"><Tooltip tooltip={`Your reprocessing proficiency for this ore based on your skills.`}>Output</Tooltip></th>
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
          {ores.map(ore => (
            <OreRow
              key={ore.label}
              ore={ore}
              holdSize={holdSize}
              userMinerals={minerals}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Ores = () => {
  const [holdSize, setHoldSize] = useSuperStickyState(1000, 'holdSize');
  const [mineralManagerVisible, setMineralManagerVisible] = useState(false);
  const [skillManagerVisible, setSkillManagerVisible] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div>
      <h2 className="text-4xl mb-4">Ores</h2>

      <p className="mb-4">The values of the ores and minerals are pulled automatically from <a href="https://eve-echoes-market.com/" target="_blank" rel="noopener noreferrer">https://eve-echoes-market.com/</a>. They are updated about once every 3 hours and are based on the average buy values of the Eve Echoes Universe. If the market rates are different (or if you need to calculated base on different values, for example, a private contract), you can set your own values if you'd like. You can also set the levels of your relevant skills to help calculate reprocessing results.</p>

      <p className="mb-4 p-2 bg-gray-300 font-bold">Values last updated {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString()}.</p>

      <div className="flex flex-wrap justify-between items-center mb-2">
        <div className="w-full sm:w-auto mb-2">
          Your hold size: <input type="number" className="py-1 px-2 bg-gray-200 rounded w-20" value={holdSize} onChange={e => setHoldSize(e.target.value)} />m<sup>3</sup>
        </div>
        <div className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-blue-600 text-blue-100 py-1 px-2 mr-2 mb-2 rounded hover:bg-blue-700" onClick={() => setSkillManagerVisible(true)}>Manage skill levels</button>
          <button className="w-full sm:w-auto bg-blue-600 text-blue-100 py-1 px-2 rounded hover:bg-blue-700" onClick={() => setMineralManagerVisible(true)}>Manage mineral values</button>
        </div>
      </div>

      <OreTable holdSize={holdSize} />

      {mineralManagerVisible && (
        <MineralManager onClose={() => setMineralManagerVisible(false)} />
      )}

      {skillManagerVisible && (
        <SkillManager onClose={() => setSkillManagerVisible(false)} onUpdate={forceUpdate} />
      )}
    </div>
  );
}

export default Ores;
