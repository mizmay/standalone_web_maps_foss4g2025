---
layout: base.njk
title: Step 6 - Configure the Stylesheet
step: 6
prev: step-05.html
next: step-07.html
mapImage: step-06.png
mapNote: "This is what your map should look like when you view it in Maputnik"
---
Now we'll update our Maplibre to load PMtiles support, and configure the stylesheet to match the Protomaps tiles we downloaded.

## Configure the Stylesheet

We need to modify our stylesheet `style.json` to:
- Use the local PMTiles file
- Show the Protomaps basemap layers
- Also show your existing trail layer

### View the Protomaps Stylesheet in Maputnik

Maputnik allows you to edit the style layers in a GUI, which is helpful since the stylesheet is otherwise over 12,000 lines of JSON when formatted in your text editor.

Maputnik also allows you to make changes and see the results live, without having to switch windows or refresh a browser pane. This is particularly helpful when you are developing a style layer from scratch.

Maputnik is [maintained by Maplibre](https://github.com/maplibre/maputnik) as a way of making it easier to understand available style parameters.

1. **Go to [https://maplibre.org/maputnik/](https://maplibre.org/maputnik/)** to view the Maputnik style editor.
2. **Load the Protomaps Light style** under Open > Gallery Styles > Protomaps Light.
3. **In the map panel on the right** pan and zoom in on Auckland, then find Waiheke Island
4. **Change from Map to Inspect** from the drop-down in the top bar, this will allow you to hover and see all of the tile layers and attributes
5. **Change back from Inspect to Map** from the drop-down in the top bar
6. **Click on Expand** in the top left corner to see all the map layers

You should now see the fully expanded list of layers defined in the Protomaps stylesheet. It is a lot!

**Note: Maplibre renders these layers in order from top to bottom, so the last layer in the list will render on top.**

The position a layer has in the render order is commonly referred to as the **z-order**

Observe the z-orders of various layers in this stylesheet. For any basemap the order will generally be:
- Landcover (areas) on the bottom
- Roads / Streams (lines) in the middle
- Labels and Icons (points) on the top

### Add Te Ara Hura

We're going to use Maputnik to add the trail styles from `style.json` in Step 3 into the Protomaps style sheet here.

Here's the `style.json` from Step 3:

```json
{
  "version": 8,
  "sources": {
    "te-ara-hura": {
      "type": "geojson",
      "data": "sources/te_ara_hura.geojson"
    }
  },
  "layers": [
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
  ]
}
```
**Important for everyone**: Make sure Caddy is still running. If not, enter `caddy run` in the terminal.

**Important for Codespaces users**: You need to make your port public so Maputnik can access your server. 

1. In the Codespaces "Ports" tab, right-click on port 1234 (or click the globe icon) and select "Port Visibility" → "Public". This allows Maputnik to access your GeoJSON and other files.

2. **Allow Access** when you get a browser prompt saying Maputnik is requesting access to your local server (or Codespaces server).

#### Add the GeoJSON Source

1. **Click on Data Sources** in the top bar of Maputnik. In the panel that pops up, you will see #protomaps listed under **Active Sources**
   
2. **Add New Source** at the bottom of the panel. Here you are going to input the fields from the `style.json` we introduced in Step 3.
   
   - `Source ID` is `te-ara-hura`
   - Under `Source Type` use the drop-down to select "GeoJSON (URL)"
   - Go to the browser tab where you are previewing your map either locally and in codespaces, and type `sources/te_ara_hura.geojson` at the end of the URL to verify you can see the GeoJSON file there.
   - If not, restart Caddy
   - Ctrl+C or Cmd+C to copy the URL to your clipboard
   - Under `URL` paste:
     - **If using local Caddy**: it will look like `http://127.0.0.1:1234/sources/te_ara_hura.geojson`
     - **If using GitHub Codespaces**: it will look like `https://xxxxx-1234.preview.app.github.dev/sources/te_ara_hura.geojson`)

#### Add a Trail Layer

1. **Click "Add Layer"** at the top of the list of layers

2. **Input the id, type, and source** as defined in the `style.json` from Step 3

3. **Input the color, width and dasharray** as defined in the `style.json` from Step 3
   
4. **Scroll to the JSON Editor** at the bottom of the Add Layer panel. Click the > to expand.

You should see a layer definition like this. If you don't, you can copy and paste this into the JSON box at the bottom of the new layer panel:

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
```
You should also see the trail as a red dashed line circling Waiheke Island.

#### Adjust the Z-Order

Let's fix the fact that the red dashed trail line is currently rendering on top of all our labels, and bisecting the Waiheke Island Aerodrome.

1. **Note the symbols at the start of each layer**: diamond for area layers, squiggle for line layers, marker for point layers.
   
2. **Find the layer you just created** at the bottom of the list of layers. Note the squiggle next to it, because this is a line layer

3. **Drag Te Ara Hura** to group it as the last of the line layers, so that it renders on top of roads and rivers, but under the labels.

Scroll to the bottom of this page, what you see in Maputnik should match the image you see below.

#### Export, Save and Edit

Now we are going to save the stylesheet you created in Maputnik to your local copy of the workshop repo (e.g. not in Codespaces).

**Important**: If you're working locally and have made changes in Codespaces (or vice versa), update your local repository in VS Code before overwriting `style.json`: 
- **Using VS Code GUI**: Open the Source Control panel (View → Source Control, or `Ctrl+Shift+G` / `Cmd+Shift+G`), click the `...` menu, and select "Pull"
- **Using command line**: Open the terminal (View → Terminal) and run `git pull`

Now you're ready to save your stylesheet:

1. **Click "Save" at the top** to save this stylesheet back into the repo. You can name it `style.json` and overwrite the earlier file at this point.
   
2. **Open `style.json` as a text file** and adjust the addresses for your `sources`, `glyphs`, and `fonts`
   - Under `sources`, `protomaps` delete the `type`, `tiles` and `maxzoom` rows with `"url": "pmtiles://sources/waiheke_island.pmtiles"`
   - Retain the attribution for Protomaps and OpenStreetMap
   - Under `sources`, remove the server address (either `http://127.0.0.1:1234/` for local Caddy or your Codespaces forwarded URL) from the beginning of the url for the Te Ara Hura GeoJSON
   - (Optional/Recommended): Replace the `glyphs` address with `lib/fonts/{fontstack}/{range}.pbf` to reference the fonts in your repo
   - (Optional/Recommended): Replace the `sprite` address with `https://YOUR-USERNAME.github.io/standalone_web_maps_foss4g2025/lib/sprite/light` where `YOUR-USERNAME` is your github handle

3. **Check the final result**, it should look like the JSON below.

```json
{
  "version": 8,
  "name": "style@4.3.0 theme@light lang@en",
  "sources": {
    "te-ara-hura": {
      "type": "geojson",
      "data": "sources/te_ara_hura.geojson"
    },
    "protomaps": {
      "type": "vector",
      "url": "pmtiles://sources/waiheke_island.pmtiles",
      "attribution": "© <a href=\"https://openstreetmap.org\" target=\"_blank\" rel=\"noopener noreferrer\">OpenStreetMap</a>"
    }
  },
  "sprite": "https://YOUR-USERNAME.github.io/standalone_web_maps_foss4g2025/lib/sprite/light",
  "glyphs": "lib/fonts/{fontstack}/{range}.pbf",
  "layers": [
   ...
  ],
}
```

4. **Save your changes** in the project file on your hard drive.

**Further instructions for Codespaces**: You need to commit and push your local changes, then pull them in Codespaces:

1. **In your local VS Code**: Commit and push your `style.json` changes
   - **Using VS Code GUI**: Open Source Control panel, stage `style.json`, enter a commit message, and click "Commit", then "Sync Changes" (or "Push")
   - **Using command line**: Run `git add style.json`, `git commit -m "Update style.json with Protomaps configuration"`, then `git push`

2. **In Codespaces**: Pull the latest changes
   - **Using VS Code GUI**: Open Source Control panel, click the `...` menu, and select "Pull"
   - **Using command line**: Run `git pull`

### Test Your Map

1. **Check to make sure your server is still running**, if not type `caddy run` in a terminal window (from your repository root directory).

2. **Refresh your browser**: 
   - **If using local Caddy**: Go to `http://127.0.0.1:1234/index.html`
   - **If using GitHub Codespaces**: Use your forwarded URL (e.g., `https://xxxxx-1234.preview.app.github.dev/index.html`)

3. **You should see** no change yet! Verify you still see the trail line. We have to define the styles for the PMTiles Protomaps layers before they will show up.

### Add PMTiles Support

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
   
```html
<script>
  // Initialize PMTiles protocol
   const protocol = new pmtiles.Protocol();
   maplibregl.addProtocol("pmtiles", protocol.tile);

   // Javascript to create a new map using Maplibre GL JS
   const map = new maplibregl.Map({
      ...})
</script>
```

3. **Save your changes** to your project file, either locally or in Codespaces.

### Test Your Map

1. **Check to make sure your server is still running**, if not type `caddy run` in a terminal window (from your repository root directory).

2. **Refresh your browser**: 
   - **If using local Caddy**: Go to `http://127.0.0.1:1234/index.html`
   - **If using GitHub Codespaces**: Use your forwarded URL (e.g., `https://xxxxx-1234.preview.app.github.dev/index.html`)

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

You should now have all the files you need to render the map. Double-check it looks like this:

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

### Commit Your Changes

Add, commit, and push your revised `index.html` and `style.json` to your remote fork, either from your hard drive or via Codespaces.

Verify that the map you see via your server (local or Codespaces) and the one you see via GitHub Pages match what you saw in Maputnik (image below).

### What You Have Now

At the end of this step, you should have:
- `style.json` - Protomaps basemap styles and your trail layer style
- Map displaying Protomaps basemap with your trail layer

---

**[← Previous: Step 5](../step-05/) | [Next: Step 7 - Add Terrain →](../step-07/)**