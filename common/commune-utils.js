const fs = require('fs');
const communes = require('./communes.json');

module.exports = {
    list ({ regexp, threshold, postprocess }) {
        const sortByMostCommon = (map) => new Map(
            [...map.entries()]
                .sort((entry1, entry2) => entry2[1].length - entry1[1].length)
        );
        const flattened = Object.keys(communes)
            .map((department) => communes[department]
                .map((commune) => ({ department, commune }))
            )
            .flat();
        const elementToCommunes = new Map();
        for (const entry of flattened) {
            let element = entry.commune
                .replace(/ /g, '-')
                .match(regexp)?.[1];
            if (!element) continue;
            element = postprocess(element);
            if (!elementToCommunes.has(element)) elementToCommunes.set(element, []);
            elementToCommunes.get(element).push(entry);
        }
        const usefulElementToCommunes = new Map();
        for (const [element, matches] of elementToCommunes.entries()) {
            if (matches.length < threshold) continue;
            usefulElementToCommunes.set(element, matches);
        }
        for (const [element, matches] of sortByMostCommon(usefulElementToCommunes)) {
            console.log(`${element} (${matches.length})`);
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
    },

    fixMap ({ mapPath, elementName, language, keepPlaceholders }) {
        const PLACEHOLDER = '[PLACEHOLDER]';
        const map = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
        const getTag = (tags, type) => tags.find((tag) => tag.startsWith(`${type}:`));
        const includesPlaceholder = (tags) => tags.includes(PLACEHOLDER);
        const entries = map.customCoordinates.filter(
            (entry) => keepPlaceholders || !includesPlaceholder(entry.extra.tags)
        );
        for (const entry of entries) {
            const tags = entry.extra.tags;
            const hasPlaceholder = includesPlaceholder(tags);
            const orderedTags = [];
            orderedTags.push(
                getTag(tags, elementName),
                getTag(tags, 'department'),
                hasPlaceholder ? PLACEHOLDER : getTag(tags, 'sign')
            );
            if (getTag(tags, elementName).includes(' (')) orderedTags.unshift(getTag(tags, 'ambiguity'));
            if (orderedTags.find((tag) => !tag)) throw new Error('Missing tag detected');
            entry.extra.tags = orderedTags;
        }


        const sortedEntries = entries.sort((entry1, entry2) => {
            const tags1 = entry1.extra.tags;
            const tags2 = entry2.extra.tags;
            return getTag(tags1, elementName).localeCompare(getTag(tags2, elementName), language)
                || getTag(tags1, 'department').localeCompare(getTag(tags2, 'department'), language)
                || Math.sign(entry1.lat - entry2.lat)
                || Math.sign(entry1.lng - entry2.lng);
        });


        map.customCoordinates = null;
        const fixed = JSON.stringify(map).replace(
            '"customCoordinates":null',
            `"customCoordinates":[\n${sortedEntries.map((entry) => JSON.stringify(entry)).join(',\n')}\n]`
        );


        const target = mapPath.replace(/\.json$/, '.fixed.json');
        fs.writeFileSync(target, fixed, 'utf-8');
        console.log(`Fixed map written to ${target}`);
    }
};
