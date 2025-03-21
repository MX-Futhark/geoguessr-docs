# General French Toponymy

🚧 In a permanent state of being unfinished 🚧

This document contains maps highlighting toponymical patterns in French commune names. Many of those patterns are already well known. The maps are based on https://ssz.fr/places/ whose database is out of base, and areas are highlighted on a largely subjective basis. Patterns are provided largely unsorted, and without any sort of etymological explanation. Most of them are also missing obvious exceptions. Make of that what you will.

## Variations of "bourg" / "ville"

### -bourg

**Regexp**: `(?%3C!^|-)bourg($|-)`

![-bourg](./img/bourg.png)

### -berg

**Regexp**: `berg($|-)`

![-berg](./img/berg.png)

### -ville

**Regexp**: `ville($|-)`

![-ville](./img/ville.png);

### -viller

**Regexp**: `viller($|-)`

![-viller](./img/viller.png);

### -villers

**Regexp**: `villers($|-)

![-villers](./img/villers.png);

### -willer
`
**Regexp**: `willer($|-)`

![-willer](./img/willer.png);

### -villiers

**Regexp**: `villiers($|-)

![-villiers](./img/villiers.png);

### -villars
`
**Regexp**: `villars($|-)`

![-villars](./img/villars.png);

### La Neuville-

**Regexp**: `^la neuville`

![La Neuville-](./img/la_neuville.png);

### -heim

**Regexp**: `heim($|-)`

![-heim](./img/heim.png)

### -ghem

**Regexp**: `ghem($|-)`

![-ghem](./img/ghem.png)

### -ghen

**Regexp**: `ghen($|-)`

![-ghen](./img/ghen.png)

## Other words

### -sur-Mer

**Regexp**: `-sur-mer$`

![-sur-Mer](./img/sur_mer.png)

### -sur- something else

**Regexp**: `-sur-(?!mer$)`

![-sur](./img/sur.png)

### -sous-

**Regexp**: `-sous-`

![-sous-](./img/sous.png)

### -Plage

**Regexp**: `-plage$`

![-Plage](./img/plage.png)

### -en-Montagne

**Regexp**: `-en-montagne$`

![-en-Montagne](./img/en_montagne.png)

### -lès-

**Regexp**: `-lès-`

![-lès-](./img/les.png)

### -lez-

**Regexp**: `-lez-`

![-lez-](./img/lez.png)

### -le-Roi

**Regexp**: `-le-roi$`

![-le-Roi](./img/le_roi.png)

### mesnil

**Regexp**: `mesnil`

![mesnil](./img/mesnil.png)

### fontaine

**Regexp**: `fontaine`

![fontaine](./img/fontaine.png)

## Natural regions

Natural regions that are not featured in [Most Useful Natural Regions of France](../natural-regions-of-france/README.md) due to not matching the desired pattern.

### -lauragais

**Regexp**: `-lauragais$`

![-lauragais](./img/lauragais.png)

### -minervois

**Regexp**: `-minervois$`

![-minervois](./img/minervois.png)

### -savès

**Regexp**: `-savès$`

![-savès](./img/saves.png)

## General prefixes

### dom-, don-

**Regexp**: `(^|-)do[mn]`

![dom-, don-](./img/dom.png)

### pl-

Esp. plou-

**Regexp**: `(^|-)pl`

![pl-](./img/pl.png)

### ker-

**Regexp**: `(^|-)ker`

![ker-](./img/ker.png)

### w-

**Regexp**: `(^|-)w`

![w-](./img/w.png)

## General suffixes

### -ac

**Regexp**: `ac($|-)`

![-ac](./img/ac.png)

### -as (excluding Saint-Thomas, Saint-Nicolas, -Bas and -Pas)

**Regexp**: `(?<!(saint-(thom|nicol)|(^|-)bas|(^|-)pas))as($|-)`

![-as](./img/as.png)

### -at

**Regexp**: `at($|-)`

![-at](./img/at.png)

### -ay

**Regexp**: `ay($|-)`

![-ay](./img/ay.png)

### -ey

**Regexp**: `ey($|-)`

![-ey](./img/ey.png)

### -an (excluding San- and Saint-Jean)

**Regexp**: `(?<!^(san-|saint-je))an($|-)`

![-an](./img/an.png)

### -ans

**Regexp**: `ans($|-)`

![-ans](./img/ans.png)

### -ais

Includes many natural regions which are better learned separately.

**Regexp**: `ais($|-)`

![-ais](./img/ais.png)

### -ois (excluding -Bois)

Includes many natural regions which are better learned separately.

**Regexp**: `(?<!-b)ois($|-)`

![-ois](./img/ois.png)

### -ous (excluding -sous-)

**Regexp**: `(?<!-s)ous($|-)`

![-ous](./img/ous.png)

### -ei

**Regexp**: `ei($|-)`

![-ei](./img/ei.png)

### -court

**Regexp**: `court($|-)`

![-court](./img/court.png)

### -ach

**Regexp**: `ach($|-)`

![-ach](./img/ach.png)

### -ech, -eich

**Regexp**: `ei?ch($|-)`

![-ech, -eich](./img/ech.png)

### -ec (excluding -Sec)

**Regexp**: `(?<!-s)ec($|-)`

![-ec](./img/ec.png)

### -ny

**Regexp**: `ny($|-)`

![-ny](./img/ny.png)

### -ry

**Regexp**: `ry($|-)`

![-ry](./img/ry.png)

### -illy

**Regexp**: `illy($|-)`

![-illy](./img/illy.png)

### -zy

**Regexp**: `zy($|-)`

![-zy](./img/zy.png)

### -sy

**Regexp**: `sy($|-)`

![-sy](./img/sy.png)

### -gy

**Regexp**: `gy($|-)`

![-gy](./img/gy.png)

### -cy

**Regexp**: `cy($|-)`

![-cy](./img/cy.png)

### -èze

**Regexp**: `èze($|-)`

![-èze](./img/eze.png)

### -eux

**Regexp**: `eux($|-)`

![-eux](./img/eux.png)

### -o

**Regexp**: `o($|-)`

![-o](./img/o.png)

### -a (excluding -la-)

**Regexp**: `(?<!-l)a($|-)`

![-a](./img/a.png)

### -ange

**Regexp**: `ange($|-)`

![-ange](./img/ange.png)

### -az

**Regexp**: `az($|-)`

![-az](./img/az.png)

### -ex

**Regexp**: `ex($|-)`

![-ex](./img/ex.png)

### -euil

**Regexp**: `euil($|-)`

![-euil](./img/euil.png)

## ols, ouls

**Regexp**: `ou?ls($|-)`

![ols, ouls](./img/ols.png)

### -ol

**Regexp**: `ol($|-)`

![-ol](./img/ol.png)

## General misc

### La -ère

**Regexp**: `^la .+ère($|-)`

![La -ère](./img/la_ere.png)

### -bec- (excluding -becq-)

**Regexp**: `bec(?!q)`

![-bec-](./img/bec.png)

### -becq-

**Regexp**: `becq`

![-becq-](./img/becq.png)
