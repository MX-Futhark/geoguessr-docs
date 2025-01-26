const communes = require('./communes.json');

communes["Rhône + Métropole de Lyon"] = communes["Rhône"].concat(communes["Métropole de Lyon"]);
Object.keys(communes).map((department) => {
    const localCommunes = communes[department];
    const sum = localCommunes.reduce(
        (acc, commune) => acc + Number(/-sur-(?!Mer)/.test(commune)),
        0
    );
    return { department, sum };
}).sort(
    (a, b) => Math.sign(a.sum - b.sum)
).forEach(({ department, sum }) => {
    console.log(`${department}: ${sum}`);
});
