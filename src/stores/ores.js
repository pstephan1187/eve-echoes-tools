export const ORE_TYPE_COMMON = "Common";
export const ORE_TYPE_UNCOMMON = "Uncommon";
export const ORE_TYPE_SPECIAL = "Special";
export const ORE_TYPE_RARE = "Rare";
export const ORE_TYPE_PRECIOUS = "Precious";

export const lastUpdateTimestamp = [2020, 9, 3, 7, 48];

export const ores = [
  { label: "Veldspar", type: ORE_TYPE_COMMON, minSec: '-1.0', maxSec: '1.0', volume: 0.1, value: 6 },
  { label: "Scordite", type: ORE_TYPE_COMMON, minSec: '-1.0', maxSec: '1.0', volume: 0.15, value: 11 },
  { label: "Plagioclase", type: ORE_TYPE_COMMON, minSec: '0.3', maxSec: '0.8', volume: 0.35, value: 21 },

  { label: "Omber", type: ORE_TYPE_UNCOMMON, minSec: '0.3', maxSec: '0.6', volume: 0.6, value: 43 },
  { label: "Kernite", type: ORE_TYPE_UNCOMMON, minSec: '0.1', maxSec: '0.6', volume: 1.2, value: 99 },
  { label: "Pyroxeres", type: ORE_TYPE_UNCOMMON, minSec: '-1.0', maxSec: '0.4', volume: 1.5, value: 247 },
  { label: "Dark Ochre", type: ORE_TYPE_UNCOMMON, minSec: '-1.0', maxSec: '0.4', volume: 1.6, value: 245 },

  { label: "Gneiss", type: ORE_TYPE_SPECIAL, minSec: '-1.0', maxSec: '0.4', volume: 2, value: 317 },
  { label: "Hemorphite", type: ORE_TYPE_SPECIAL, minSec: '-1.0', maxSec: '0.2', volume: 3, value: 421 },
  { label: "Spodumain", type: ORE_TYPE_SPECIAL, minSec: '-1.0', maxSec: '0.2', volume: 3.2, value: 541 },

  { label: "Hedbergite", type: ORE_TYPE_RARE, minSec: '-1.0', maxSec: '0.0', volume: 3, value: 493 },
  { label: "Jaspet", type: ORE_TYPE_RARE, minSec: '-1.0', maxSec: '0.0', volume: 4, value: 665 },
  { label: "Crokite", type: ORE_TYPE_RARE, minSec: '-1.0', maxSec: '-0.2', volume: 6.4, value: 821 },

  { label: "Arkonor", type: ORE_TYPE_PRECIOUS, minSec: '-1.0', maxSec: '-0.6', volume: 6.4, value: 850 },
  { label: "Bistot", type: ORE_TYPE_PRECIOUS, minSec: '-1.0', maxSec: '-0.4', volume: 6.4, value: 705 },
  { label: "Mercoxit", type: ORE_TYPE_PRECIOUS, minSec: '-1.0', maxSec: '-0.8', volume: 8, value: 601 },
]
