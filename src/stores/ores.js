// https://github.com/dai-shi/react-hooks-global-state
import { createGlobalState } from 'react-hooks-global-state';
import { getStickyState, setStickyState } from '../utils';
import marketValues from '../MarketValues';

export const ORE_TYPE_COMMON = "Common";
export const ORE_TYPE_UNCOMMON = "Uncommon";
export const ORE_TYPE_SPECIAL = "Special";
export const ORE_TYPE_RARE = "Rare";
export const ORE_TYPE_PRECIOUS = "Precious";

export const orgOres = [
  { label: "Veldspar",    type: ORE_TYPE_COMMON,    minSec: '-1.0', maxSec:  '1.0', volume: 0.10, value: marketValues.veldspar.jita },
  { label: "Scordite",    type: ORE_TYPE_COMMON,    minSec: '-1.0', maxSec:  '1.0', volume: 0.15, value: marketValues.scordite.jita },
  { label: "Plagioclase", type: ORE_TYPE_COMMON,    minSec:  '0.3', maxSec:  '0.8', volume: 0.35, value: marketValues.plagioclase.jita },

  { label: "Omber",       type: ORE_TYPE_UNCOMMON,  minSec:  '0.3', maxSec:  '0.6', volume: 0.60, value: marketValues.omber.jita },
  { label: "Kernite",     type: ORE_TYPE_UNCOMMON,  minSec:  '0.1', maxSec:  '0.6', volume: 1.20, value: marketValues.kernite.jita },
  { label: "Pyroxeres",   type: ORE_TYPE_UNCOMMON,  minSec: '-1.0', maxSec:  '0.4', volume: 1.50, value: marketValues.pyroxeres.jita },
  { label: "Dark Ochre",  type: ORE_TYPE_UNCOMMON,  minSec: '-1.0', maxSec:  '0.4', volume: 1.60, value: marketValues.dark_ochre.jita },

  { label: "Gneiss",      type: ORE_TYPE_SPECIAL,   minSec: '-1.0', maxSec:  '0.4', volume: 2.00, value: marketValues.gneiss.jita },
  { label: "Hemorphite",  type: ORE_TYPE_SPECIAL,   minSec: '-1.0', maxSec:  '0.2', volume: 3.00, value: marketValues.hemorphite.jita },
  { label: "Spodumain",   type: ORE_TYPE_SPECIAL,   minSec: '-1.0', maxSec:  '0.2', volume: 3.20, value: marketValues.spodumain.jita },

  { label: "Hedbergite",  type: ORE_TYPE_RARE,      minSec: '-1.0', maxSec:  '0.0', volume: 3.00, value: marketValues.hedbergite.jita },
  { label: "Jaspet",      type: ORE_TYPE_RARE,      minSec: '-1.0', maxSec:  '0.0', volume: 4.00, value: marketValues.jaspet.jita },
  { label: "Crokite",     type: ORE_TYPE_RARE,      minSec: '-1.0', maxSec: '-0.2', volume: 6.40, value: marketValues.crokite.jita },

  { label: "Arkonor",     type: ORE_TYPE_PRECIOUS,  minSec: '-1.0', maxSec: '-0.6', volume: 6.40, value: marketValues.arkonor.jita },
  { label: "Bistot",      type: ORE_TYPE_PRECIOUS,  minSec: '-1.0', maxSec: '-0.4', volume: 6.40, value: marketValues.bistot.jita },
  { label: "Mercoxit",    type: ORE_TYPE_PRECIOUS,  minSec: '-1.0', maxSec: '-0.8', volume: 8.00, value: marketValues.mercoxit.jita },
];

const initialState = {
  ores: getStickyState(JSON.parse(JSON.stringify(orgOres)), 'ores')
};

const {
  useGlobalState,
  getGlobalState,
  setGlobalState,
} = createGlobalState(initialState);

export const useOres = () => {
  const [ores, setOres] = useGlobalState('ores');

  const setOreValue = (ore, newValue) => {
    const newOres = [...ores];

    for (const i in newOres) {
      if (newOres[i] === ore) {
        const newOre = { ...ore, value: newValue };
        newOres[i] = newOre;

        break
      }
    }

    setStickyState(newOres, 'ores');
    setOres(newOres);
  };

  const resetOreValue = (ore, value) => {
    const newOres = [...ores]

    if (value !== '' && (value * 1 === 0 || !isNaN(value))) {
      return;
    }

    for (const i in newOres) {
      if (newOres[i] === ore) {
        const newOre = { ...ore };
        newOre.value = orgOres.find(
          orgOre => orgOre.label === newOre.label
        ).value;
        newOres[i] = newOre;

        break;
      }
    }

    setStickyState(newOres, 'ores');
    setOres(newOres);
  }

  return {
    ores: ores,
    setOreValue,
    resetOreValue,
  }
}

export const getOres = () => getGlobalState('ores');
export const setOres = (value) => setGlobalState('ores', value);
