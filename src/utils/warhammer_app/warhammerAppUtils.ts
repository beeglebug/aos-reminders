const CREATED_BY_WARHAMMER_APP = 'Created with Warhammer Age of Sigmar: The App'

export const warhammerAppPlaceholders = {
  ALLY_SUFFIX: ' (ALLY)',
  ARMY_NAME_PREFIX: 'Army Name: ',
  ARMY_NOTES_PREFIX: 'Army Notes: ',
  ARTIFACTS_PREFIX: 'Artefacts of Power: ',
  BATTALIONS: '---BATTALIONS---',
  COMMAND_TRAITS_PREFIX: 'Command Traits: ',
  CREATED_BY_WARHAMMER_APP,
  END_OF_ENTRY: '---END_OF_ENTRY---',
  END_OF_LIST: '---END_OF_LIST---',
  ENDLESS_SPELLS: '---ENDLESS_SPELLS---',
  ENHANCEMENTS: '---ENHANCEMENTS---',
  FACTION_NAME_PREFIX: 'FACTION_NAME: ',
  FLAVOR_PREFIX: 'FLAVOR: ',
  GRAND_STRATEGIES_PREFIX: 'Grand Strategies: ',
  INVALID_LIST: `Invalid: ${CREATED_BY_WARHAMMER_APP}`,
  MOUNT_TRAITS_PREFIX: 'Mount Traits: ',
  PRAYERS_PREFIX: 'Prayers: ',
  SCENERY: '---SCENERY---',
  SPELLS_PREFIX: 'Spells: ',
  SUBFACTION_PREFIX: 'SUBFACTION: ',
  TRIUMPHS_PREFIX: 'Triumphs: ',
  UNITS: '---UNITS---',
  VALID_LIST: `Valid: ${CREATED_BY_WARHAMMER_APP}`,
}

export const cleanWarhammerAppText = (text: string): string[] => {
  return text
    .split('\n')
    .map(txt =>
      txt
        .replace(/[‘’]/g, `'`) // Replace special quotes
        .replace(/[“”]/g, `"`) // Replace special quotes
        .replace(/[‑–—]/g, `-`) // Replace special dashes
        .replace(/ /g, ` `) // Remove non ASCII-spaces

        // Replace special characters
        .replace(/ú/, 'u')
        .replace(/á/, 'a')

        .trim()

        // Replace leading "- "
        .replace(/^- /g, '')
        // .replace( // TODO: UNCOMMENT ME
        //   /^- (Army Faction|Army Type|Subfaction|Points Cost|Host Option|Mark of Chaos|Army Notes|General|Battle Trait Bonus|Reinforced|Battlefield Role|Battlepack|Points Limit|Battalion Slot Filled)/g,
        //   '$1'
        // )

        // Remove unnecessary info
        .replace(/ \(General\)$/g, '') // Remove General tag e.g. "Lord Kroak (General)" -> "Lord Kroak"
        .replace(/^General$/g, '') // Remove General entry
        .replace(
          /^(Army Notes|General|Battle Trait Bonus|Reinforced|Battlefield Role|Battlepack|Points Limit|Battalion Slot Filled): .+/g,
          ''
        )
        .replace(/^Mark of Chaos: .+/g, '') // Remove Mark of Chaos tag e.g. "Mark of Chaos: Khorne"
        .replace(/^Host Option: .+/g, '') // Remove Host Option tag e.g. "Host Option: General"
        .replace(/^[0-9]+ x /g, '') // Remove quantity from units e.g. "3 x Razordons"
        .replace(/ \([0-9]+\)$/g, '') // Remove point values e.g. "Slann Starmaster (360)"

        // Replace text with standardized endings
        .replace(/^Points Cost: .+/g, warhammerAppPlaceholders.END_OF_ENTRY) // Replace "Points Cost: 430 pts" with a constant separator (helps to mark the end of a unit entry)
        .replace(/^(Total Points|TOTAL POINTS): .+/g, warhammerAppPlaceholders.END_OF_LIST) // Replace "Total Points: 2000 pts" with a constant separator (helps to mark the end of a list)
        .replace('Endless Spells/Invocations', warhammerAppPlaceholders.ENDLESS_SPELLS)
        .replace(/^ENDLESS SPELLS & INVOCATIONS/g, warhammerAppPlaceholders.ENDLESS_SPELLS)
        .replace(/^(Core Battalions|CORE BATTALIONS)$/g, warhammerAppPlaceholders.BATTALIONS)
        .replace(/^Enhancements$/g, warhammerAppPlaceholders.ENHANCEMENTS)
        .replace(/^(Faction Terrain|TERRAIN)$/g, warhammerAppPlaceholders.SCENERY)
        .replace(/^(Units|BATTLELINE|LEADERS|OTHER|BEHEMOTH)$/g, warhammerAppPlaceholders.UNITS)
        .replace(/^Army Faction: /g, warhammerAppPlaceholders.FACTION_NAME_PREFIX)
        .replace(/^Army Type: /g, warhammerAppPlaceholders.SUBFACTION_PREFIX) // Army Type in WH App === Subfactions in AoSr
        .replace(/^Subfaction: /g, warhammerAppPlaceholders.FLAVOR_PREFIX) // Subfactions in WH App === Flavors in AoSr
        .replace(/ \(Coalition Ally\)$/g, warhammerAppPlaceholders.ALLY_SUFFIX) // Mark Allies appropriately
        .replace(/ \(Ally\)$/g, warhammerAppPlaceholders.ALLY_SUFFIX) // Mark Allies appropriately

        // Faction specific and/or special prefixes go here
        .replace(/^Great Endrinworks: /g, warhammerAppPlaceholders.ARTIFACTS_PREFIX)
        .replace(/^Cursed Mutations: /g, warhammerAppPlaceholders.MOUNT_TRAITS_PREFIX)
        .replace(/^Drakeblood Curses: /g, warhammerAppPlaceholders.COMMAND_TRAITS_PREFIX)

        // Remove uncategorized traits (e.g. "- Great Stormbow and Stormstrike Axe")
        // TODO:
        // One final trim, and we're done!
        .trim()
    )
    .filter(txt => txt && txt.length > 2)
}
