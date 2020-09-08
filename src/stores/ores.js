export const ORE_TYPE_COMMON = "Common";
export const ORE_TYPE_UNCOMMON = "Uncommon";
export const ORE_TYPE_SPECIAL = "Special";
export const ORE_TYPE_RARE = "Rare";
export const ORE_TYPE_PRECIOUS = "Precious";

export const lastUpdateTimestamp = [2020, 9, 7, 21, 34];

export const ores = [
  { label: "Veldspar", type: ORE_TYPE_COMMON, minSec: '-1.0', maxSec: '1.0', volume: 0.1, value: 7 },
  { label: "Scordite", type: ORE_TYPE_COMMON, minSec: '-1.0', maxSec: '1.0', volume: 0.15, value: 14 },
  { label: "Plagioclase", type: ORE_TYPE_COMMON, minSec: '0.3', maxSec: '0.8', volume: 0.35, value: 23 },

  { label: "Omber", type: ORE_TYPE_UNCOMMON, minSec: '0.3', maxSec: '0.6', volume: 0.6, value: 45 },
  { label: "Kernite", type: ORE_TYPE_UNCOMMON, minSec: '0.1', maxSec: '0.6', volume: 1.2, value: 101 },
  { label: "Pyroxeres", type: ORE_TYPE_UNCOMMON, minSec: '-1.0', maxSec: '0.4', volume: 1.5, value: 267 },
  { label: "Dark Ochre", type: ORE_TYPE_UNCOMMON, minSec: '-1.0', maxSec: '0.4', volume: 1.6, value: 270 },

  { label: "Gneiss", type: ORE_TYPE_SPECIAL, minSec: '-1.0', maxSec: '0.4', volume: 2, value: 400 },
  { label: "Hemorphite", type: ORE_TYPE_SPECIAL, minSec: '-1.0', maxSec: '0.2', volume: 3, value: 500 },
  { label: "Spodumain", type: ORE_TYPE_SPECIAL, minSec: '-1.0', maxSec: '0.2', volume: 3.2, value: 665 },

  { label: "Hedbergite", type: ORE_TYPE_RARE, minSec: '-1.0', maxSec: '0.0', volume: 3, value: 661 },
  { label: "Jaspet", type: ORE_TYPE_RARE, minSec: '-1.0', maxSec: '0.0', volume: 4, value: 800 },
  { label: "Crokite", type: ORE_TYPE_RARE, minSec: '-1.0', maxSec: '-0.2', volume: 6.4, value: 1201 },

  { label: "Arkonor", type: ORE_TYPE_PRECIOUS, minSec: '-1.0', maxSec: '-0.6', volume: 6.4, value: 1005 },
  { label: "Bistot", type: ORE_TYPE_PRECIOUS, minSec: '-1.0', maxSec: '-0.4', volume: 6.4, value: 910 },
  { label: "Mercoxit", type: ORE_TYPE_PRECIOUS, minSec: '-1.0', maxSec: '-0.8', volume: 8, value: 713 },
]
