This should really be automated…

- Look up a regular expression at https://ssz.fr/places/ with the following conditions:
   * 1920x1080 screen
   * Fullscreen Google Chrome
   * 25% zoom level
- Take a screenshot and align it with the other layers in _master.xcf
- Select by color with a threshold of 30 on a dot of uniform color

If the commune density is high:
- Increase selection by one, copy/paste to a new screen-mode, black-background layer
- Fill with #ffff00 and undo selection
- Apply gaussian blur with a radius of 12.5px
- Change luminosity/contrast with parameters L50/C100
- Set layer opacity to 35%


If the commune density is low (or if there is a low-density area worth highlighting despite a higher density area elsewhere):
- Same steps as above with parameters L75/C100

If the commune density is too sparse for the above to yield a proper highlight:
- Over a new transparent layer, increase selection by 10
- Soften selection by 1.5 and fill with #ffff00
- Reduce selection by one, delete, and fill again with 15% opacity
- Set layer opacity to 50%
