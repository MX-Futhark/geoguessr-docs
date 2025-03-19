require('../common/commune-utils').list({
    regexp: /-sur-(?:le-|la-|l')?(?!Mer\b)(.+)/,
    postprocess: (river) => river,
    threshold: 10
});
