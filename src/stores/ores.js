import { useStickyState } from '../utils';

export const ORE_TYPE_COMMON = "Common";
export const ORE_TYPE_UNCOMMON = "Uncommon";
export const ORE_TYPE_SPECIAL = "Special";
export const ORE_TYPE_RARE = "Rare";
export const ORE_TYPE_PRECIOUS = "Precious";

const lastUpdateTimestamp = [2020, 9, 5, 22, 36];

const lastUpdated = new Date();
lastUpdated.setUTCFullYear(lastUpdateTimestamp[0]);
lastUpdated.setUTCMonth(lastUpdateTimestamp[1] - 1);
lastUpdated.setUTCDate(lastUpdateTimestamp[2]);
lastUpdated.setUTCHours(lastUpdateTimestamp[3] + (lastUpdated.getTimezoneOffset() / 60));
lastUpdated.setUTCMinutes(lastUpdateTimestamp[4]);
lastUpdated.setUTCSeconds(0);

export { lastUpdated };

export const ores = [
  { label: "Veldspar", type: ORE_TYPE_COMMON, minSec: '-1.0', maxSec: '1.0', volume: 0.1, value: 6 },
  { label: "Scordite", type: ORE_TYPE_COMMON, minSec: '-1.0', maxSec: '1.0', volume: 0.15, value: 12 },
  { label: "Plagioclase", type: ORE_TYPE_COMMON, minSec: '0.3', maxSec: '0.8', volume: 0.35, value: 22 },

  { label: "Omber", type: ORE_TYPE_UNCOMMON, minSec: '0.3', maxSec: '0.6', volume: 0.6, value: 50 },
  { label: "Kernite", type: ORE_TYPE_UNCOMMON, minSec: '0.1', maxSec: '0.6', volume: 1.2, value: 100 },
  { label: "Pyroxeres", type: ORE_TYPE_UNCOMMON, minSec: '-1.0', maxSec: '0.4', volume: 1.5, value: 260 },
  { label: "Dark Ochre", type: ORE_TYPE_UNCOMMON, minSec: '-1.0', maxSec: '0.4', volume: 1.6, value: 276 },

  { label: "Gneiss", type: ORE_TYPE_SPECIAL, minSec: '-1.0', maxSec: '0.4', volume: 2, value: 369 },
  { label: "Hemorphite", type: ORE_TYPE_SPECIAL, minSec: '-1.0', maxSec: '0.2', volume: 3, value: 465 },
  { label: "Spodumain", type: ORE_TYPE_SPECIAL, minSec: '-1.0', maxSec: '0.2', volume: 3.2, value: 610 },

  { label: "Hedbergite", type: ORE_TYPE_RARE, minSec: '-1.0', maxSec: '0.0', volume: 3, value: 550 },
  { label: "Jaspet", type: ORE_TYPE_RARE, minSec: '-1.0', maxSec: '0.0', volume: 4, value: 716 },
  { label: "Crokite", type: ORE_TYPE_RARE, minSec: '-1.0', maxSec: '-0.2', volume: 6.4, value: 1001 },

  { label: "Arkonor", type: ORE_TYPE_PRECIOUS, minSec: '-1.0', maxSec: '-0.6', volume: 6.4, value: 856 },
  { label: "Bistot", type: ORE_TYPE_PRECIOUS, minSec: '-1.0', maxSec: '-0.4', volume: 6.4, value: 1048 },
  { label: "Mercoxit", type: ORE_TYPE_PRECIOUS, minSec: '-1.0', maxSec: '-0.8', volume: 8, value: 541 },
];

export const useOres = () => {
  const [userOres, setUserOres] = useStickyState(
    JSON.parse(JSON.stringify(ores)),
    'ores'
  );

  const setOreValue = (oreName, newValue) => {
    const newOreValues = JSON.parse(JSON.stringify(userOres));

    for (const i in newOreValues) {
      if (newOreValues[i].label === oreName) {
        newOreValues[i].value = newValue;
      }
    }

    setUserOres(newOreValues);
  };

  const resetOreValue = (oreName, newValue) => {
    const newOreValues = JSON.parse(JSON.stringify(userOres))

    if (newValue === null || newValue === '') {
      for (const i in ores) {
        if (ores[i].label === oreName) {
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

  return { userOres, setOreValue, resetOreValue };
}
