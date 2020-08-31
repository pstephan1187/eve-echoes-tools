export const ORE_TYPE_COMMON = "Common";
export const ORE_TYPE_UNCOMMON = "Uncommon";
export const ORE_TYPE_RARE = "Rare";
export const ORE_TYPE_VERY_RARE = "Very Rare";

export const lastUpdateTimestamp = [2020, 8, 31, 8, 3];

export const ores = [
  { label: "Veldspar", type: ORE_TYPE_COMMON, minSec: '-1.0', maxSec: '1.0', volume: 0.1, value: 5 },
  { label: "Scordite", type: ORE_TYPE_COMMON, minSec: '-1.0', maxSec: '1.0', volume: 0.15, value: 10 },
  { label: "Plagioclase", type: ORE_TYPE_COMMON, minSec: '0.3', maxSec: '0.8', volume: 0.35, value: 20 },
  { label: "Omber", type: ORE_TYPE_COMMON, minSec: '0.3', maxSec: '0.6', volume: 0.6, value: 42 },
  { label: "Kernite", type: ORE_TYPE_COMMON, minSec: '0.1', maxSec: '0.6', volume: 1.2, value: 97 },

  { label: "Pyroxeres", type: ORE_TYPE_UNCOMMON, minSec: '-1.0', maxSec: '0.4', volume: 1.5, value: 218 },
  { label: "Hemorphite", type: ORE_TYPE_UNCOMMON, minSec: '-1.0', maxSec: '0.2', volume: 3, value: 413 },
  { label: "Dark Ochre", type: ORE_TYPE_UNCOMMON, minSec: '-1.0', maxSec: '0.4', volume: 1.6, value: 217 },
  { label: "Gneiss", type: ORE_TYPE_UNCOMMON, minSec: '-1.0', maxSec: '0.4', volume: 2, value: 310 },

  { label: "Jaspet", type: ORE_TYPE_RARE, minSec: '-1.0', maxSec: '0.0', volume: 4, value: 650 },
  { label: "Crokite", type: ORE_TYPE_RARE, minSec: '-1.0', maxSec: '-0.2', volume: 6.4, value: 910 },

  { label: "Bistot", type: ORE_TYPE_VERY_RARE, minSec: '-1.0', maxSec: '-0.4', volume: 6.4, value: 670 },
  { label: "Arkonor", type: ORE_TYPE_VERY_RARE, minSec: '-1.0', maxSec: '-0.6', volume: 6.4, value: 600 },
  { label: "Mercoxit", type: ORE_TYPE_VERY_RARE, minSec: '-1.0', maxSec: '-0.8', volume: 8, value: 430 },
  { label: "Hedbergite", type: ORE_TYPE_VERY_RARE, minSec: '-1.0', maxSec: '0.0', volume: 3, value: 466 },
  { label: "Spodumain", type: ORE_TYPE_VERY_RARE, minSec: '-1.0', maxSec: '0.2', volume: 3.2, value: 530 },
]
