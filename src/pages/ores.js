import React from 'react';
import { ores, lastUpdateTimestamp, ORE_TYPE_COMMON, ORE_TYPE_UNCOMMON, ORE_TYPE_SPECIAL, ORE_TYPE_RARE, ORE_TYPE_PRECIOUS } from '../stores/ores';
import { minerals } from '../stores/minerals';
import { reprocessOreByVolume } from "../OreReprocessor";
import Tooltip from "../components/tooltip";
import { getStickyState, getSuperStickyState, setStickyState, setSuperStickyState } from "../utils";

export default class Ores extends React.Component {
  constructor(props) {
    super(props);

    this.lastUpdated = new Date();
    this.lastUpdated.setUTCFullYear(lastUpdateTimestamp[0]);
    this.lastUpdated.setUTCMonth(lastUpdateTimestamp[1] - 1);
    this.lastUpdated.setUTCDate(lastUpdateTimestamp[2]);
    this.lastUpdated.setUTCHours(lastUpdateTimestamp[3] + (this.lastUpdated.getTimezoneOffset() / 60));
    this.lastUpdated.setUTCMinutes(lastUpdateTimestamp[4]);
    this.lastUpdated.setUTCSeconds(0);

    this.state = {
      userOres: getStickyState(JSON.parse(JSON.stringify(ores)), 'ores'),
      userMinerals: getStickyState(JSON.parse(JSON.stringify(minerals)), 'minerals'),
      holdSize: getSuperStickyState(1000, 'holdSize'),
      mineralManagerVisibility: false,
    };
  }

  setOreValue = (oreName, newValue) => {
    const newOreValues = JSON.parse(JSON.stringify(this.state.userOres));

    for (const i in newOreValues) {
      if (newOreValues[i].label === oreName) {
        newOreValues[i].value = newValue;
      }
    }

    this.setUserOres(newOreValues);
  }

  resetOreValue = (oreName, newValue) => {
    const newOreValues = JSON.parse(JSON.stringify(this.state.userOres))

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

    this.setUserOres(newOreValues);
  }

  setMineralValue = (mineralName, newValue) => {
    const newMineralValues = JSON.parse(JSON.stringify(this.state.userMinerals))

    for (const i in newMineralValues) {
      if (newMineralValues[i].label === mineralName) {
        newMineralValues[i].value = newValue;
      }
    }

    this.setUserMinerals(newMineralValues);
  }

  resetMineralValue = (mineralName, newValue) => {
    const newMineralValues = JSON.parse(JSON.stringify(this.state.userMinerals))

    if (newValue === null || newValue === '') {
      for (const i in minerals) {
        if (minerals[i].label === mineralName) {
          console.log(newValue, minerals[i].value);
          newValue = minerals[i].value;
        }
      }

      for (const i in newMineralValues) {
        if (newMineralValues[i].label === mineralName) {
          newMineralValues[i].value = newValue;
        }
      }
    }

    this.setUserMinerals(newMineralValues);
  }

  setUserOres = userOres => {
    setStickyState(userOres, 'ores');
    this.setState({ userOres: userOres });
  }

  setUserMinerals = userMinerals => {
    setSuperStickyState(userMinerals, 'minerals');
    this.setState({ userMinerals: userMinerals });
  }

  setHoldSize = size => {
    setSuperStickyState(size, 'holdSize');
    this.setState({holdSize: size});
  }

  closeMineralManager = () => {
    this.setState({ mineralManagerVisibility: false });
  }

  renderOresTable = () => {
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
                <Tooltip tooltip={`The approximate value of a haul if your entire ${this.state.holdSize}m<sup>3</sup> hold was filled with the given ore.`}>Hold Value</Tooltip>
              </th>
              <th className="text-right">
                <Tooltip tooltip={`The approximate value of the resulting minerals if ${this.state.holdSize}m<sup>3</sup> of the the given ore were reprocessed.`}>
                  Reprocessed Value
                  </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.userOres.map(this.renderOreRow)}
          </tbody>
        </table>
      </div>
    );
  }

  renderOreRow = (ore) => {
    const colorClass = {
      [ORE_TYPE_COMMON]: 'blue',
      [ORE_TYPE_UNCOMMON]: 'teal',
      [ORE_TYPE_SPECIAL]: 'green',
      [ORE_TYPE_RARE]: 'yellow',
      [ORE_TYPE_PRECIOUS]: 'red'
    }[ore.type];

    const volumeValue = Math.round(this.state.holdSize / ore.volume * ore.value);
    const reprocessResult = reprocessOreByVolume(ore, this.state.holdSize);

    const reprocessedValue = Math.round(
      reprocessResult.reduce((value, mineralUnits) => {
        const userValue = this.state.userMinerals.find(userMineral => userMineral.label === mineralUnits.mineral.label).value;
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
            onChange={e => this.setOreValue(ore.label, e.target.value)}
            onBlur={e => this.resetOreValue(ore.label, e.target.value)}
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

  renderMineralManager = () => {
    if (!this.state.mineralManagerVisibility) {
      return null;
    }

    return (
      <div className="fixed z-50 flex justify-center items-center inset-0">
        <div className="fixed z-0 w-full h-full bg-gray-700 opacity-75" onClick={() => this.closeMineralManager()}></div>
        <div className="relative z-10 bg-white rounded-md overflow-hidden shadow-md w-3/4 md:w-1/2 lg:w-1/3 max-h-screen overflow-y-auto">
          <h3 className="text-xl mb-4 py-2 px-4 bg-gray-200">Minerals</h3>
          {this.state.userMinerals.map(mineral => {
            return (
              <div className="flex px-4">
                <div className="flex-none w-32 whitespace-no-wrap pr-4">{mineral.label}</div>
                <div className="flex-auto whitespace-no-wrap text-right py-1">
                  <input
                    className="w-16 bg-gray-200 rounded-sm shadow-inner text-right px-1 mr-1"
                    type="text"
                    value={mineral.value}
                    onChange={(e) => this.setMineralValue(mineral.label, e.target.value)}
                    onBlur={(e) => this.resetMineralValue(mineral.label, e.target.value)}
                  />
                      isk/unit
                    </div>
              </div>
            );
          })}
          <div className="flex justify-end p-4">
            <button className="bg-blue-600 text-blue-100 py-1 px-2 rounded" onClick={() => this.closeMineralManager()}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2 className="text-4xl mb-4">Ores</h2>

        <p className="mb-4">The values of the ores are not updated automatically. I update them periodically based on approximate market rates of Jita and/or Alikara and additional nearby ITCs. Due to the daily variance of the market, you can set your own values if you'd like.</p>

        <p className="mb-4 p-2 bg-gray-300 font-bold">Values last updated {this.lastUpdated.toLocaleDateString()} {this.lastUpdated.toLocaleTimeString()}.</p>

        <div className="flex justify-between items-center mb-2">
          <div>
            Your hold size: <input type="number" className="py-1 px-2 bg-gray-200 rounded w-20" value={this.state.holdSize} onChange={e => this.setHoldSize(e.target.value)} />m<sup>3</sup>
          </div>
          <div>
            <button className="bg-blue-600 text-blue-100 py-1 px-2 rounded hover:bg-blue-700" onClick={() => this.setState({ mineralManagerVisibility: true })}>Manage mineral values</button>
          </div>
        </div>

        {this.renderOresTable()}
        {this.renderMineralManager()}
      </div>
    );
  }
}
