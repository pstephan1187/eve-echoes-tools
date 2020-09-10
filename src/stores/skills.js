import { RPSkill } from "../SkillTypes";

export const skills = [
  new RPSkill(
    "it.rp.cop", "Common Ore Processing",
    ["Veldspar", "Plagioclase", "Scordite"],
    (skillLevel, baseSkill) => baseSkill * (skillLevel / 10)
  ),
  new RPSkill(
    "it.rp.acop", "Advanced Common Ore Processing",
    ["Veldspar", "Plagioclase", "Scordite"],
    (skillLevel, baseSkill) => baseSkill * ((5 + skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.ecop", "Expert Common Ore Processing",
    ["Veldspar", "Plagioclase", "Scordite"],
    (skillLevel, baseSkill) => baseSkill * ((skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.uop", "Uncommon Ore Processing",
    ["Omber", "Kernite", "Pyroxeres", "Dark Ochre"],
    (skillLevel, baseSkill) => baseSkill * (skillLevel / 10)
  ),
  new RPSkill(
    "it.rp.auop", "Advanced Uncommon Ore Processing",
    ["Omber", "Kernite", "Pyroxeres", "Dark Ochre"],
    (skillLevel, baseSkill) => baseSkill * ((5 + skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.euop", "Expert Uncommon Ore Processing",
    ["Omber", "Kernite", "Pyroxeres", "Dark Ochre"],
    (skillLevel, baseSkill) => baseSkill * ((skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.sop", "Special Ore Processing",
    ["Gneiss", "Spodumain", "Hemorphite"],
    (skillLevel, baseSkill) => baseSkill * (skillLevel / 10)
  ),
  new RPSkill(
    "it.rp.asop", "Advanced Special Ore Processing",
    ["Gneiss", "Spodumain", "Hemorphite"],
    (skillLevel, baseSkill) => baseSkill * ((5 + skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.esop", "Expert Special Ore Processing",
    ["Gneiss", "Spodumain", "Hemorphite"],
    (skillLevel, baseSkill) => baseSkill * ((skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.rop", "Rare Ore Processing",
    ["Hedbergite", "Jaspet", "Crokite"],
    (skillLevel, baseSkill) => baseSkill * (skillLevel / 10)
  ),
  new RPSkill(
    "it.rp.arop", "Advanced Rare Ore Processing",
    ["Hedbergite", "Jaspet", "Crokite"],
    (skillLevel, baseSkill) => baseSkill * ((5 + skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.erop", "Expert Rare Ore Processing",
    ["Hedbergite", "Jaspet", "Crokite"],
    (skillLevel, baseSkill) => baseSkill * ((skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.pop", "Precious Ore Processing",
    ["Arkonor", "Bistot", "Mercoxit"],
    (skillLevel, baseSkill) => baseSkill * (skillLevel / 10)
  ),
  new RPSkill(
    "it.rp.apop", "Advanced Precious Ore Processing",
    ["Arkonor", "Bistot", "Mercoxit"],
    (skillLevel, baseSkill) => baseSkill * ((5 + skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.epop", "Expert Precious Ore Processing",
    ["Arkonor", "Bistot", "Mercoxit"],
    (skillLevel, baseSkill) => baseSkill * ((skillLevel * 5) / 100)
  ),
]
