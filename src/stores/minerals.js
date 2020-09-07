import { useStickyState } from '../utils';

export const lastUpdateTimestamp = [2020, 9, 5, 22, 36];

export const minerals = [
  { label: "Tritanium", volume: 0.01, value: 2 },
  { label: "Pyerite", volume: 0.01, value: 22 },
  { label: "Mexallon", volume: 0.01, value: 38 },
  { label: "Isogen", volume: 0.01, value: 127 },
  { label: "Nocxium", volume: 0.01, value: 1203 },
  { label: "Zydrine", volume: 0.01, value: 900 },
  { label: "Megacyte", volume: 0.01, value: 3400 },
  { label: "Morphite", volume: 0.01, value: 3001 },
];

export const useMinerals = () => {
  const [userMinerals, setUserMinerals] = useStickyState(
    JSON.parse(JSON.stringify(minerals)),
    'minerals'
  );

  const setMineralValue = (mineralName, newValue) => {
    const newMineralValues = JSON.parse(JSON.stringify(userMinerals));

    for (const i in newMineralValues) {
      if (newMineralValues[i].label === mineralName) {
        newMineralValues[i].value = newValue;
      }
    }

    setUserMinerals(newMineralValues);
  };

  const resetMineralValue = (mineralName, newValue) => {
    const newMineralValues = JSON.parse(JSON.stringify(userMinerals))

    if (newValue === null || newValue === '') {
      for (const i in minerals) {
        if (minerals[i].label === mineralName) {
          newValue = minerals[i].value;
        }
      }

      for (const i in newMineralValues) {
        if (newMineralValues[i].label === mineralName) {
          newMineralValues[i].value = newValue;
        }
      }
    }

    setUserMinerals(newMineralValues);
  }

  return { userMinerals, setMineralValue, resetMineralValue };
}
