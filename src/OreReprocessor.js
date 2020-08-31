import { minerals } from "./stores/minerals";

const tritanium = minerals[0];
const pyerite = minerals[1];
const mexallon = minerals[2];
const isogen = minerals[3];
const nocxium = minerals[4];
const zydrine = minerals[5];
const megacyte = minerals[6];
const morphite = minerals[7];

const map = [
  {
    label: "Veldspar", reprocessesInto: [
      { mineral: tritanium, amount: 1.62 },
    ]
  },
  {
    label: "Scordite", reprocessesInto: [
      { mineral: tritanium, amount: 0.63 },
      { mineral: pyerite, amount: 0.45 },
    ]
  },
  {
    label: "Plagioclase", reprocessesInto: [
      { mineral: tritanium, amount: 0.2 },
      { mineral: pyerite, amount: 0.25 },
      { mineral: mexallon, amount: 0.38 },
    ]
  },
  {
    label: "Omber", reprocessesInto: [
      { mineral: tritanium, amount: 2.34 },
      { mineral: pyerite, amount: 0.3 },
      { mineral: isogen, amount: 0.21 },
    ]
  },
  {
    label: "Kernite", reprocessesInto: [
      { mineral: tritanium, amount: 1.04 },
      { mineral: mexallon, amount: 1.87 },
      { mineral: isogen, amount: 0.19 },
    ]
  },

  {
    label: "Pyroxeres", reprocessesInto: [
      { mineral: tritanium, amount: 6.84 },
      { mineral: pyerite, amount: 2.18 },
      { mineral: mexallon, amount: 0.98 },
      { mineral: nocxium, amount: 0.12 },
    ]
  },
  {
    label: "Hemorphite", reprocessesInto: [
      { mineral: tritanium, amount: 21.45 },
      { mineral: isogen, amount: 0.62 },
      { mineral: nocxium, amount: 0.05 },
      { mineral: zydrine, amount: 0.2 },
    ]
  },
  {
    label: "Dark Ochre", reprocessesInto: [
      { mineral: tritanium, amount: 3.74 },
      { mineral: isogen, amount: 0.22 },
      { mineral: nocxium, amount: 0.17 },
    ]
  },
  {
    label: "Gneiss", reprocessesInto: [
      { mineral: pyerite, amount: 3.43 },
      { mineral: mexallon, amount: 3.59 },
      { mineral: isogen, amount: 0.71 },
    ]
  },

  {
    label: "Jaspet", reprocessesInto: [
      { mineral: mexallon, amount: 7.28 },
      { mineral: nocxium, amount: 0.14 },
      { mineral: zydrine, amount: 0.17 },
    ]
  },
  {
    label: "Crokite", reprocessesInto: [
      { mineral: tritanium, amount: 116.4 },
      { mineral: nocxium, amount: 0.28 },
      { mineral: zydrine, amount: 0.29 },
    ]
  },

  {
    label: "Bistot", reprocessesInto: [
      { mineral: pyerite, amount: 18.36 },
      { mineral: zydrine, amount: 0.11 },
      { mineral: megacyte, amount: 0.24 },
    ]
  },
  {
    label: "Arkonor", reprocessesInto: [
      { mineral: tritanium, amount: 26.4 },
      { mineral: mexallon, amount: 3 },
      { mineral: megacyte, amount: 0.31 },
    ]
  },
  {
    label: "Mercoxit", reprocessesInto: [
      { mineral: morphite, amount: 0.18 },
    ]
  },
  {
    label: "Hedbergite", reprocessesInto: [
      { mineral: pyerite, amount: 8.19 },
      { mineral: isogen, amount: 1.38 },
      { mineral: nocxium, amount: 0.03 },
      { mineral: zydrine, amount: 0.04 },
    ]
  },
  {
    label: "Spodumain", reprocessesInto: [
      { mineral: tritanium, amount: 76.83 },
      { mineral: pyerite, amount: 14.59 },
      { mineral: mexallon, amount: 1.4 },
      { mineral: isogen, amount: 0.23 },
    ]
  },
];

export const reprocessOreByVolume = (ore, volume) => {
  const mapping = map.find(entry => entry.label === ore.label);

  return mapping.reprocessesInto.map(mineralAmount => {
    return { mineral: mineralAmount.mineral, units: Math.floor(mineralAmount.amount * (volume / ore.volume))}
  });
}
