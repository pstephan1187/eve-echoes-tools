// https://github.com/dai-shi/react-hooks-global-state
import { createGlobalState } from 'react-hooks-global-state';
import { getStickyState, setStickyState } from '../utils';
import marketValues from '../MarketValues';

export const orgMinerals = [
  { label: "Tritanium", volume: 0.01, value: marketValues.tritanium.jita },
  { label: "Pyerite",   volume: 0.01, value: marketValues.pyerite.jita },
  { label: "Mexallon",  volume: 0.01, value: marketValues.mexallon.jita },
  { label: "Isogen",    volume: 0.01, value: marketValues.isogen.jita },
  { label: "Nocxium",   volume: 0.01, value: marketValues.nocxium.jita },
  { label: "Zydrine",   volume: 0.01, value: marketValues.zydrine.jita },
  { label: "Megacyte",  volume: 0.01, value: marketValues.megacyte.jita },
  { label: "Morphite",  volume: 0.01, value: marketValues.morphite.jita },
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
