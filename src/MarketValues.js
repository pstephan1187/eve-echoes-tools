export let lastUpdated = new Date();

const marketValues = {
  // ores
  veldspar: { jita: 0 },
  scordite: { jita: 0 },
  plagioclase: { jita: 0 },

  omber: { jita: 0 },
  kernite: { jita: 0 },
  pyroxeres: { jita: 0 },
  dark_ochre: { jita: 0 },

  gneiss: { jita: 0 },
  hemorphite: { jita: 0 },
  spodumain: { jita: 0 },

  hedbergite: { jita: 0 },
  jaspet: { jita: 0 },
  crokite: { jita: 0 },

  arkonor: { jita: 0 },
  bistot: { jita: 0 },
  mercoxit: { jita: 0 },

  // minerals
  tritanium: { jita: 0 },// 2
  pyerite: { jita: 0 },// 36
  mexallon: { jita: 0 },// 55
  isogen: { jita: 0 },// 165
  nocxium: { jita: 0 },// 2410
  zydrine: { jita: 0 },// 1500
  megacyte: { jita: 0 },
  morphite: { jita: 0 },
};

export class MarketValues {
  static requests = [];
  static oldestValue = Math.floor(Date.now() / 1000);

  static listeners = [];

  static ready(listener) {
    MarketValues.listeners.push(listener);
  }

  static fireDoneEvent() {
    lastUpdated = new Date(MarketValues.oldestValue * 1000);

    for (const listener of MarketValues.listeners) {
      listener();
    }
  }

  static getBuyValue(id, marketKey) {
    MarketValues.requests.push(id);

    const url = `https://api.eve-echoes-market.com/market-stats/${id}`;
    fetch(url).then(
      response => response.json()
    ).then(json => {
      const value = json[json.length - 1].buy;
      const stamp = json[json.length - 1].time;
      marketValues[marketKey].jita = value;
      MarketValues.requests.splice(MarketValues.requests.indexOf(id), 1);

      if (stamp < MarketValues.oldestValue) {
        MarketValues.oldestValue = stamp;
      }

      if (MarketValues.requests.length === 0) {
        MarketValues.fireDoneEvent();
      }
    });
  }
}

export default marketValues;
