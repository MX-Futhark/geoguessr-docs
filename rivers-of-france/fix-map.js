const fs = require('fs');
const map = require('./map.json');


const getTag = (tags, type) => tags.find((tag) => tag.startsWith(`${type}:`))
for (const entry of map.customCoordinates) {
    const tags = entry.extra.tags;
    const orderedTags = [];
    orderedTags.push(
        getTag(tags, 'river'),
        getTag(tags, 'department'),
        getTag(tags, 'sign')
    );
    if (getTag(tags, 'river').includes(' (')) orderedTags.unshift(getTag(tags, 'ambiguity'));
    if (orderedTags.find((tag) => !tag)) throw new Error('Missing tag detected');
    entry.extra.tags = orderedTags;
}


const coordinates = map.customCoordinates.sort((entry1, entry2) => {
    const tags1 = entry1.extra.tags;
    const tags2 = entry2.extra.tags;
    return getTag(tags1, 'river').localeCompare(getTag(tags2, 'river'), 'fr')
        || getTag(tags1, 'department').localeCompare(getTag(tags2, 'department'), 'fr')
        || Math.sign(entry1.lat - entry2.lat)
        || Math.sign(entry1.lng - entry2.lng);
});


map.customCoordinates = null;
const fixed = JSON.stringify(map).replace(
    '"customCoordinates":null',
    `"customCoordinates":[\n${coordinates.map((entry) => JSON.stringify(entry)).join(',\n')}\n]`
);


const target = 'map.fixed.json';
fs.writeFileSync(target, fixed, 'utf-8');
console.log(`Fixed map written to ${target}`);
