---
layout: base.njk
title: Step 6 - Configure the Stylesheet
step: 6
prev: step-05.html
next: step-07.html
---

## Configure the Stylesheet

Now we'll configure the stylesheet to match the Protomaps tiles we downloaded. This involves downloading the matching Protomaps stylesheet, sprites, and fonts, then storing them locally in your repository.

### Update index.html

Update your `index.html` to load PMTiles support.

1. **Add the `src` link for the PMTiles library** stored in `lib/`. Add it to the `<head>` section, just below the local copies of Maplibre GL JS, and notice they are structured similarly.
   
```html
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Te Ara Hura Trail Map</title>
      
      <!-- Local copies of MapLibre GL JS -->
      <script src="lib/maplibre-gl.5.10.0.js"></script>
      <link href="lib/maplibre-gl.5.10.0.css" rel="stylesheet" />

      <!-- PMTiles support -->
      <script src="lib/pmtiles.4.3.0.js"></script>
```

2. **Activate the PMTiles protocol** by adding these lines just above where the map is defined:

<script>
  // Initialize PMTiles protocol
   const protocol = new pmtiles.Protocol();
   maplibregl.addProtocol("pmtiles", protocol.tile);

   // Javascript to create a new map using Maplibre GL JS
   const map = new maplibregl.Map({
      ...})
</script>

3. **Save your changes**

### Test Your Map

1. **Check to make sure your local server is still running**, if not type `make serve` in a terminal window.

2. **Refresh your browser**: Go to `http://localhost:1234/index.html`

3. **You should see**:
   - No change yet! Verify you still see the trail line

### Troubleshooting

**Map doesn't load?**
- Check developer console for errors
- Verify `style.json` exists in root directory
- Verify file paths in stylesheet are correct

### Download Protomaps Stylesheet

Protomaps provides a base stylesheet that matches the PMTiles tiles. We'll download the appropriate version:

1. **In your browser, go back to the Protomaps Builds page**: Visit [https://build.protomaps.com/](https://build.protomaps.com/)
2. **Click <u>map</u>** in the row for the build you just downloaded
3. **Click the "Get style JSON"** and then "Copy to Clipboard"
4. **Create a new text file** in your text editor (File > New Text File in VS Code) and paste from the clipboard
5. **Save the file** as `protomaps.5.7.0.json`

You now have a style JSON that when formatted is over 12,000 lines long!

You can also access the latest stylesheet and other assets from: [https://github.com/protomaps/basemaps-assets](https://github.com/protomaps/basemaps-assets)

Or directly from the command line:
```bash
curl -o protomaps.5.7.0.json https://raw.githubusercontent.com/protomaps/basemaps-assets/main/styles/protomaps-light.json
```
### Combine the Stylesheets

Now we need to modify our stylesheet `style.json` to:
- Use the local PMTiles file
- Show the Protomaps basemap layers
- Also show your existing trail layer

The instructions below will walk you through how to edit style JSONs directly. We won't do much of this, because editing raw JSON is not for the faint of heart, and if you break the JSON syntax, your map will not load. 

If you are using it, VS Code will register an error for bad syntax, so save often and pay attention.

1. **Open `protomaps.5.7.0.json` in your text editor** and give the stylesheet a name attribute set to the current file name:
   
   ```json
   {
     "version": 8,
     "name": "protomaps.5.7.0",
     "sources": { ...}
   }
   ```

2. **Replace the protomaps URL** with `pmtiles:///sources/waiheke_island.pmtiles`, to reference our custom extract.

   You will find the URL under sources. The final result should look like this:
   
   ```json
   {
     "version": 8,
     "name": "protomaps.5.7.0",
     "sources": {
         "protomaps": {
            "type": "raster",
            "url": "pmtiles:///sources/waiheke_island.pmtiles",
            "tileSize": 512
         }
     },
     "layers": [
       // ... existing Protomaps layers ...
     ]
   }
   ```
3. **Add your trail source** "te-ara-hura" as shown below, be sure to add a comma after the `protomaps` source:

   ```json
   {
     "version": 8,
     "name": "protomaps.5.7.0",
     "glyphs": "/lib/fonts/{fontstack}/{range}.pbf",
     "sprite": "/lib/sprites/sprite",
     "sources": {
         "protomaps": {
            "type": "raster",
            "url": "pmtiles:///sources/waiheke_island.pmtiles",
            "tileSize": 512
         },
         "te-ara-hura": {
            "type": "geojson",
            "data": "sources/te_ara_hura.geojson"
         }
     },
     "layers": [
       // ... existing Protomaps layers ...
     ]
   }
   ```
   
4. **Add your trail layer** just inside the closing square bracket `]` just above glyph and sprite lines you just deleted. This bracket is the end of the list of style layers:

   ```json
   [
        {   // end of the style layer places_country
        },  // be sure to add a comma after this bracket if there isn't one
   ```

   Copy this section from here or from the existing `style.json` and paste it above the `],`:

   ```json
        {
            "id": "trail-line",
            "type": "line",
            "source": "te-ara-hura",
            "paint": {
                "line-color": "#e41f18",
                "line-width": 3,
                "line-dasharray": [2, 2]
            }
        }
  ],
   ```

1. **Save `protomaps.5.7.0.json` with your modifications as `style.json`**. this will overwrite the previous stylesheet now that you've moved everything into the larger file.

You can delete `protomaps.5.7.0.json` as you do not need it anymore.

### Test Your Map

1. **Check to make sure your local server is still running**, if not type `make serve` in a terminal window.

2. **Refresh your browser**: Go to `http://localhost:1234/index.html`

3. **You should see**:
   - The Protomaps basemap (roads, labels, landcover)
   - Proper styling with icons and fonts
   - The Te Ara Hura trail displayed on top

### Troubleshooting

**Map doesn't load?**
- Check developer console for errors
- Verify `style.json` exists in root directory
- Verify file paths in stylesheet are correct

**PMTiles not loading?**
- Verify `sources/waiheke_island.pmtiles` exists
- Check that PMTiles protocol is initialized in `index.js`
- Verify the PMTiles URL in `style.json` uses `pmtiles://` protocol

### Verify Your Directory Structure

Congratulations! You should now have all the files you need to render the map. Double-check it looks like this:

```
standalone_web_maps_foss4g2025/
├── README.md                    # This file
├── Makefile                     # Build and serve commands (uses Caddy)
├── index.html                   # Main HTML file for the web map (contains inline CSS and JavaScript)
├── style.json                   # Source and style for Te Ara Hura and the Protomaps tile layers, fonts and sprites
├── lib/                         # Third-party libraries (self-contained)
└── sources/                     # Source data files
    ├── waiheke_island.pmtiles   # PMTiles archive for Waiheke Island basemap - added in later steps
    └── te_ara_hura.geojson      # GeoJSON file for Te Ara Hura trail
```

### What You Have Now

At the end of this step, you should have:
- `style.json` - Protomaps bassemap styls and your trail layer style
- Map displaying Protomaps basemap with your trail layer

---

**[← Previous: Step 5](../step-05/) | [Next: Step 7 - Add Terrain →](../step-07/)**

