import { useSuperStickyState } from './utils';

const skills = [
  {
    label: 'Common Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Veldspar", "Plagioclase", "Scordite"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * (skillLevel / 10) : 0;
    }
  },
  {
    label: 'Advanced Common Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Veldspar", "Plagioclase", "Scordite"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * ((5 + skillLevel * 5) / 100) : 0;
    }
  },
  {
    label: 'Expert Common Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Veldspar", "Plagioclase", "Scordite"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * ((skillLevel * 5) / 100) : 0;
    }
  },

  {
    label: 'Uncommon Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Omber", "Kernite", "Pyroxeres", "Dark Ochre"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * (skillLevel / 10) : 0;
    }
  },
  {
    label: 'Advanced Uncommon Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Omber", "Kernite", "Pyroxeres", "Dark Ochre"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * ((5 + skillLevel * 5) / 100) : 0;
    }
  },
  {
    label: 'Expert Uncommon Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Omber", "Kernite", "Pyroxeres", "Dark Ochre"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * ((skillLevel * 5) / 100) : 0;
    }
  },

  {
    label: 'Special Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Gneiss", "Spodumain", "Hemorphite"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * (skillLevel / 10) : 0;
    }
  },
  {
    label: 'Advanced Special Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Gneiss", "Spodumain", "Hemorphite"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * ((5 + skillLevel * 5) / 100) : 0;
    }
  },
  {
    label: 'Expert Special Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Gneiss", "Spodumain", "Hemorphite"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * ((skillLevel * 5) / 100) : 0;
    }
  },

  {
    label: 'Rare Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Hedbergite", "Jaspet", "Crokite"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * (skillLevel / 10) : 0;
    }
  },
  {
    label: 'Advanced Rare Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Hedbergite", "Jaspet", "Crokite"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * ((5 + skillLevel * 5) / 100) : 0;
    }
  },
  {
    label: 'Expert Rare Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Hedbergite", "Jaspet", "Crokite"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * ((skillLevel * 5) / 100) : 0;
    }
  },

  {
    label: 'Precious Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Arkonor", "Bistot", "Mercoxit"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * (skillLevel / 10) : 0;
    }
  },
  {
    label: 'Advanced Precious Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Arkonor", "Bistot", "Mercoxit"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * ((5 + skillLevel * 5) / 100) : 0;
    }
  },
  {
    label: 'Expert Precious Ore Processing',
    characterLevel: 0,
    category: "Industrial Technology",
    subCategory: "Resource Processing",
    getReprocessModifier: (ore, baseSkill, skillLevel) => {
      if (["Arkonor", "Bistot", "Mercoxit"].indexOf(ore.label) === -1) {
        return 0;
      }

      return skillLevel > 0 ? baseSkill * ((skillLevel * 5) / 100) : 0;
    }
  },
];

export const useSkills = () => {
  const [userSkills, setUserSkills] = useSuperStickyState(skills, 'skills');

  const setSkillLevel = (skillLabel, level) => {
    level = level < 0 ? 0 : level;
    level = level > 5 ? 5 : level;

    const newSkills = JSON.parse(JSON.stringify(userSkills));

    for (let i in newSkills) {
      if (newSkills[i].label === skillLabel) {
        newSkills[i].characterLevel = level;
        break;
      }
    }

    setUserSkills(newSkills);
  }

  const getOreReprocessingModifier = (ore) => {
    const baseSkill = 0.3;
    let modifiedSkill = baseSkill;

    for (const i in userSkills) {
      const orgSkill = skills[i];
      const skill = userSkills[i];
      if ('getReprocessModifier' in orgSkill) {
        modifiedSkill += orgSkill.getReprocessModifier(ore, baseSkill, skill.characterLevel);
      }
    }

    return Math.round(modifiedSkill * 10000) / 10000;// Percentage to the second decimal
  }

  return { skills: userSkills, getOreReprocessingModifier, setSkillLevel };
}
