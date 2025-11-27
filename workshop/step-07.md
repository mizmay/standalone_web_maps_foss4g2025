---
layout: base.njk
title: Step 7 - Add Terrain
step: 7
prev: step-06.html
next: step-08.html
mapImage: step-07.png
mapNote: "This is what your map should look like when you view it locally and via your Github Pages website"
---
In this step, we'll add terrain to your map by styling custom tiles with a hillshade effect. This will give your map a 3D appearance and help users understand the topography of Waiheke Island.

## Creating a Hillshade

We'll create a hillshade using raster digital elevation model (DEM) tiles we can style from the stylesheet to create the appearance of terrain.

### Download Terrain Tiles

We'll download the raster DEM tiles for the same bounding box we used for Protomaps:

1. **Download Mapterhorn tiles**: Use the PMTiles CLI to extract raster-dem tiles:
    ```bash
    pmtiles extract \
    --bbox=174.8,-37.0,175.2,-36.7 \
    https://download.mapterhorn.com/planet.pmtiles \
    sources/waiheke_island_terrain.pmtiles
    ```
   **Note**: The source for these tiles is [Mapterhorn](https://protomaps.com/blog/mapterhorn-terrain/), a recent effort to update the quality and coverage of global terrain tiles. The work is ongoing, so if you have a business with an interest high resolution terrain data for visualization, please reach out!

2. **Wait for download**: This may take several minutes depending on your connection.

### Update Your Stylesheet

Now we'll add the terrain layers to your `style.json`. Follow the instructions for Step 6 to do this through Maputnik, or follow the instructions below to edit the `style.json` directly.

1. **Add the terrain source** to your `sources` section in `style.json`:
   ```json
   {
     {
     "version": 8,
     "sources": {
       ... },
       "terrain": {
         "type": "raster-dem",
         "url": "pmtiles://sources/waiheke_island_terrain.pmtiles",
         "tileSize": 256,
         "encoding": "terrarium"
       }
     },
     "layers": [
       // ... existing layers ...
     ]
   }
   ```

2. **Add the hillshade layer** to your layers list. This should go after the `earth` layer but **before** the `landcover` layer so it appears underneath:
   ```json
   {
     "id": "hillshade",
     "type": "hillshade",
     "source": "terrain",
     "paint": {
       "hillshade-accent-color": "hsla(0, 0%, 0%, 0.1)",
       "hillshade-exaggeration": 0.5,
       "hillshade-highlight-color": "hsla(0, 0%, 100%, 0.1)",
       "hillshade-illumination-direction": 315,
       "hillshade-shadow-color": "hsla(0, 0%, 0%, 0.5)"
     }
   }
   ```

   Here is an explanation of these properties:
   - `hillshade-exaggeration`: Controls how dramatic the terrain looks (0.0 to 1.0)
   - `hillshade-illumination-direction`: Direction of the light source (0-359 degrees)
   - `hillshade-accent-color`: Color of shadows
   - `hillshade-highlight-color`: Color of highlights

### Test Your Map

1. **Refresh your browser**: make sure your server is still running and go to:
   - **If using local Caddy**: `http://127.0.0.1:1234/index.html`
   - **If using GitHub Codespaces**: Use your forwarded URL (e.g., `https://xxxxx-1234.preview.app.github.dev/index.html`)

2. **You should see**:
   - The Protomaps basemap
   - Terrain showing the topography underneath the landcover
   - Te Ara Hura displayed on top


### Troubleshooting

**Terrain doesn't show?**
- Check that `sources/terrarium-waiheke.pmtiles` exists
- Verify the terrain source is correctly defined in `style.json`
- Check browser console (F12) for errors
- Make sure the terrain source uses `pmtiles://` protocol

### Commit Your Changes

Add, commit, and push your revised `index.html` and `style.json` to your remote fork.

**Note for Codespaces users**: Commit these changes in your Codespaces environment using the terminal or Source Control panel. 

Verify that the map you see via your local server and the one you see via Github Pages match the image below.

### What You Have Now

At the end of this step, you should have:
- `sources/terrarium-waiheke.pmtiles` - Terrain elevation data
- Hillshade layer displaying terrain shading

Your map now shows the beautiful topography of Waiheke Island! 🏔️

### Want to take this further?

These style edits are just the beginning. If you want to keep polishing, here are some challenges:
1. **Add some transparency to the landcover** so that you can see the terrain through it
2. **Refine the Te Ara Hura styling** by changing the color, or changing the line width across zooms
3. **Refine the terrain styling** by modifying the color values for shadows and highlights, changing the exaggeration

---

**[← Previous: Step 6](../step-06/) | [Next: Step 8 - Add Interactivity →](../step-08/)**

