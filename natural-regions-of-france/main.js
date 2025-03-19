require('../common/commune-utils').list({
    regexp: /-(?:en-(?:l'|le-|la-|les-)?|d'|de-(?:la-|l')?|du-|des-|à-(?:la-|l')?|au-|aux-)(?!l'|le-|la-|les-|Bois\b|Bosc\b|Champs?\b|Prés?\b|Montagne\b|Monts?$|Lacs?\b|Mer\b|Rivière\b|Vignes\b|Plaine\b|Val\b|Vaux\b|Vallée\b|Vallon\b|Forêt\b|Landes\b|Tour\b|Désert\b|Île\b|Isle\b)(.+)/,
    postprocess: (region) => {
        if (region.startsWith('Mont-')) return region;
        if (region.startsWith('Grand-')) return region.replace('Grand-', '');
        return region.replace(/-.+/, '');
    },
    threshold: 8
});
