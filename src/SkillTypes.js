import { getSuperStickyState, setSuperStickyState } from './utils';

export class Skill {
  constructor(id, label, category, subCategory) {
    this.id = id;
    this.label = label;
    this.category = category;
    this.subCategory = subCategory;
    this.level = getSuperStickyState(0, `skill-level-${id}`);
  }

  setLevel(level) {
    this.level = level;
    setSuperStickyState(level, `skill-level-${this.id}`);
  }
}

export class ITSkill extends Skill {
  constructor(id, label, subCategory) {
    super(id, label, 'Industrial Technology', subCategory);
  }
}

export class RPSkill extends ITSkill {
  static baseSkill = 0.3;

  constructor(id, label, canReprocess, modifierFn) {
    super(id, label, 'Resource Processing');

    this.canReprocess = canReprocess;
    this.modifierCallback = modifierFn;
  }

  getReprocessModifier (ore) {
    if (this.canReprocess.indexOf(ore.label) === -1) {
      return 0;
    }

    return this.level > 0 ? this.modifierCallback(this.level, RPSkill.baseSkill) : 0;
  }
}
