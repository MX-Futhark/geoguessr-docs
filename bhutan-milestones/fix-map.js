const fs = require('fs');
const path = require('path');

const mapContent = fs.readFileSync(path.join(__dirname, 'map.json'), 'utf-8');
const fixed = mapContent
    .trim()
    .split('\n')
    .filter((line, index, lines) =>
        index === 0 || index === lines.length - 1
            || !/\[(indistinguishable|empty|no road number)\]/.test(line)
    )
    .join('\n')
    .replace('},\n],"extra"', '}\n],"extra"');
fs.writeFileSync(path.join(__dirname, 'training-map.json'), `${fixed}\n`, 'utf-8');
