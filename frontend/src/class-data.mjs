// Role groups are set by Solar Forge. Descriptions are paraphrased from
// https://aion2.wiki.fextralife.com/Classes (reviewed 2026-10-03).
export const classSource = 'https://aion2.wiki.fextralife.com/Classes';

export const classGroups = [
  {
    id: 'tank',
    title: 'Tank',
    summary: 'Lead from the front and help your party stand its ground.',
    classes: [
      {name: 'Gladiator', description: 'A heavy weapon melee fighter whose sweeping attacks bring damage to the front line.'},
      {name: 'Templar', description: 'A defensive frontliner who holds enemy attention and uses control to protect the group.'}
    ]
  },
  {
    id: 'dps',
    title: 'DPS',
    summary: 'Bring the damage with close combat, ranged attacks, magic, or summons.',
    classes: [
      {name: 'Elementalist', description: 'A summoner who commands elemental spirits to fight alongside the party.'},
      {name: 'Assassin', description: 'A stealth-focused melee attacker built around quick bursts of damage.'},
      {name: 'Ranger', description: 'A ranged bow user who adds traps to control the flow of a fight.'},
      {name: 'Sorcerer', description: 'A ranged spellcaster who deals damage through elemental magic.'}
    ]
  },
  {
    id: 'healer',
    title: 'Healer',
    summary: 'Keep allies ready for the next encounter with recovery and support.',
    classes: [
      {name: 'Cleric', description: 'A healer who restores allies and backs them with protective magic.'},
      {name: 'Chanter', description: 'A hybrid support healer who strengthens allies with buffs and recovery.'}
    ]
  }
];
