// https://github.com/dai-shi/react-hooks-global-state
import { createGlobalState } from 'react-hooks-global-state';
import { getStickyState, setStickyState } from '../utils';

export const orgMinerals = [
  { label: "Tritanium", volume: 0.01, value: 2 },
  { label: "Pyerite", volume: 0.01, value: 26 },
  { label: "Mexallon", volume: 0.01, value: 40 },
  { label: "Isogen", volume: 0.01, value: 141 },
  { label: "Nocxium", volume: 0.01, value: 1305 },
  { label: "Zydrine", volume: 0.01, value: 1150 },
  { label: "Megacyte", volume: 0.01, value: 3623 },
  { label: "Morphite", volume: 0.01, value: 2505 },
];

const initialState = {
  minerals: getStickyState(JSON.parse(JSON.stringify(orgMinerals)), 'minerals'),
};

const {
  useGlobalState,
  getGlobalState,
  setGlobalState,
} = createGlobalState(initialState);

export const useMinerals = () => {
  const [minerals, setMinerals] = useGlobalState('minerals');

  const setMineralValue = (mineral, value) => {
    const newMinerals = [...minerals];

    for (const i in newMinerals) {
      if (newMinerals[i] === mineral) {
        const newMineral = { ...mineral };
        newMineral.value = value;
        newMinerals[i] = newMineral;

        break;
      }
    }

    setStickyState(newMinerals, 'minerals');
    setMinerals(newMinerals);
  }

  const resetMineralValue = (mineral, value) => {
    const newMinerals = [...minerals];

    if (value !== '' && (value * 1 === 0 || !isNaN(value))) {
      return;
    }

    for (const i in newMinerals) {
      if (newMinerals[i] === mineral) {
        const newMineral = { ...mineral };
        newMineral.value = orgMinerals.find(
          orgMineral => orgMineral.label === newMineral.label
        ).value;
        newMinerals[i] = newMineral;

        break;
      }
    }

    setStickyState(newMinerals, 'minerals');
    setMinerals(newMinerals);
  }

  return {
    minerals: minerals,
    setMineralValue,
    resetMineralValue,
  }
}

export const getMinerals = () => getGlobalState('minerals');
export const setMinerals = (value) => setGlobalState('minerals', value);
