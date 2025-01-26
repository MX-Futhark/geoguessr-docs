const communes = require('./communes.json');
const THRESHOLD = 10;
const sortByMostCommon = (map) => new Map(
    [...map.entries()]
        .sort((entry1, entry2) => entry2[1].length - entry1[1].length)
);
const flattened = Object.keys(communes)
    .map((department) => communes[department]
        .map((commune) => ({ department, commune }))
    )
    .flat();
const riverToCommunes = new Map();
for (const entry of flattened) {
    const river = entry.commune.match(/-sur-(le-|la-|l')?(.+)$/)?.[2];
    // /!\ Rarely, some such suffixes are not rivers
    // (e.g. Villers-sur-Port, which would be better named Villers-lès-Port
    // as it is close to Port-sur-Saône) but aside from "Mer",
    // all of these exceptions are filtered out by the threshold.
    if (!river || river === 'Mer') continue;
    if (!riverToCommunes.has(river)) riverToCommunes.set(river, []);
    riverToCommunes.get(river).push(entry);
}
const usefulRiverToCommunes = new Map();
for (const [river, matches] of riverToCommunes.entries()) {
    if (matches.length < THRESHOLD) continue;
    usefulRiverToCommunes.set(river, matches);
}
for (const [river, matches] of sortByMostCommon(usefulRiverToCommunes)) {
    console.log(`${river} (${matches.length})`);
    const departmentToCommunes = new Map();
    for (const { department, commune } of matches) {
        if (!departmentToCommunes.has(department)) departmentToCommunes.set(department, []);
        departmentToCommunes.get(department).push(commune);
    }
    for (const [department, communes] of sortByMostCommon(departmentToCommunes)) {
        console.log(`\t${department}`);
        for (const commune of communes) {
            console.log(`\t\t${commune}`);
        }
    }
}
