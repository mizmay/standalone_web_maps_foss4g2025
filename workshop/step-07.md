---
layout: base.njk
title: Step 7 - Add Terrain (Hillshade, Contours)
step: 7
prev: step-06.html
next: step-08.html
---

## Adding Terrain Visualization

In this step, we'll add terrain visualization to your map using hillshade and contour layers. This will give your map a 3D appearance and help users understand the topography of Waiheke Island.

### Download Terrarium Terrain Tiles

Terrarium format terrain tiles provide elevation data. We'll download the terrain tiles for the same bounding box we used for Protomaps:

1. **Download Terrarium tiles**: Use the PMTiles CLI to extract terrain tiles:
   ```bash
   pmtiles extract https://registry.opendata.aws/terrain-tiles/terrarium-z12.pmtiles sources/terrarium-waiheke.pmtiles \
     --bbox=174.8,-37.0,175.2,-36.7
   ```

   **Note**: The source for these tiles is [AWS Open Data Registry](https://registry.opendata.aws/terrain-tiles/) and they're created by [Tilezen](https://github.com/tilezen/joerd).

   **Warning**: These terrain tiles are from approximately 2008 or before. For more recent elevation data, you would need to:
   - Download a DEM from another source
   - Convert it to RGB-encoded PMTiles format
   - Use it as a raster-dem source instead

2. **Wait for download**: This may take several minutes depending on your connection.

3. **Verify the file**:
   ```bash
   ls -lh sources/terrarium-waiheke.pmtiles
   ```

### Update Your Stylesheet

Now we'll add the terrain layers to your `style.json`:

1. **Add the terrain source** to your `sources` section in `style.json`:
   ```json
   {
     "version": 8,
     "glyphs": "/lib/fonts/{fontstack}/{range}.pbf",
     "sprite": "/lib/sprites/sprite",
     "sources": {
       "protomaps": {
         "type": "raster",
         "url": "pmtiles:///sources/waiheke_island.pmtiles",
         "tileSize": 512
       },
       "terrain": {
         "type": "raster-dem",
         "url": "pmtiles:///sources/terrarium-waiheke.pmtiles",
         "tileSize": 256,
         "encoding": "terrarium"
       }
     },
     "layers": [
       // ... existing layers ...
     ]
   }
   ```

2. **Add the hillshade layer** to your layers array. This should go **before** your trail layer so it appears underneath:
   ```json
   {
     "id": "hillshade",
     "type": "hillshade",
     "source": "terrain",
     "paint": {
       "hillshade-accent-color": "hsla(0, 0%, 0%, 0.1)",
       "hillshade-exaggeration": 0.5,
       "hillshade-highlight-color": "hsla(0, 0%, 100%, 0.1)",
       "hillshade-illumination-anchor": "viewport",
       "hillshade-illumination-direction": 315,
       "hillshade-shadow-color": "hsla(0, 0%, 0%, 0.5)"
     }
   }
   ```

3. **Add contour lines** (optional but recommended):
   ```json
   {
     "id": "contours",
     "type": "line",
     "source": "terrain",
     "source-layer": "contours",
     "paint": {
       "line-color": "hsl(210, 10%, 30%)",
       "line-width": 1,
       "line-opacity": 0.4
     }
   }
   ```

   **Note**: If your Terrarium extract doesn't include pre-generated contours, you may need to generate them separately or skip this layer.

### Update Layer Order

Make sure your layers are in the correct order in `style.json`:
1. Base Protomaps layers (bottom)
2. Hillshade layer
3. Contour layer (if using)
4. Your trail layer (top)

### Test Your Map

1. **Refresh your browser**: Go to `http://localhost:1234/index.html`

2. **You should see**:
   - The Protomaps basemap
   - Terrain shading showing elevation changes
   - Contour lines (if added)
   - The Te Ara Hura trail displayed on top

### Adjust Hillshade Settings

You can adjust the hillshade appearance by modifying these properties in `style.json`:

- `hillshade-exaggeration`: Controls how dramatic the terrain looks (0.0 to 1.0)
- `hillshade-illumination-direction`: Direction of the light source (0-359 degrees)
- `hillshade-accent-color`: Color of shadows
- `hillshade-highlight-color`: Color of highlights

Experiment with these values to get the look you want!

### Alternative: Using Modern DEM Data

If you want to use more recent elevation data:

1. **Find a DEM source** (e.g., local government, national mapping agency)
2. **Download the DEM** for Waiheke Island area
3. **Convert to RGB-encoded PMTiles** using tools like:
   - [rio-rgbify](https://github.com/mapbox/rio-rgbify) for encoding
   - PMTiles CLI for conversion
4. **Update stylesheet** to use the new DEM source

### Troubleshooting

**Terrain doesn't show?**
- Check that `sources/terrarium-waiheke.pmtiles` exists
- Verify the terrain source is correctly defined in `style.json`
- Check browser console (F12) for errors
- Make sure the terrain source uses `pmtiles://` protocol

**Hillshade too dark/bright?**
- Adjust `hillshade-exaggeration` (lower = subtler, higher = more dramatic)
- Adjust `hillshade-illumination-direction` (changes where shadows appear)
- Modify color values for shadows and highlights

**File too large?**
- The terrain extract might be large
- You can reduce zoom levels or bounding box if needed
- Check file size: `ls -lh sources/terrarium-waiheke.pmtiles`

### What You Have Now

At the end of this step, you should have:
- `sources/terrarium-waiheke.pmtiles` - Terrain elevation data
- Hillshade layer displaying terrain shading
- Contour lines (optional) showing elevation contours
- Map with full terrain visualization

Your map now shows the beautiful topography of Waiheke Island! 🏔️

---

**[← Previous: Step 6](../step-06/) | [Next: Step 8 - Add Interactivity →](../step-08/)**

