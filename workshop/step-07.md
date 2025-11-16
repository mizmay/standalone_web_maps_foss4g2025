---
layout: base.njk
title: Step 7 - Add Terrain (Hillshade, Contours)
step: 7
prev: step-06.html
next: step-08.html
---

### Update Layer Order

Let's change the render order of the style layers so that Te Ara Hura renders below the labels and icons.

## Adding Terrain

In this step, we'll add terrain to your map using hillshade and contour layers. This will give your map a 3D appearance and help users understand the topography of Waiheke Island.

### Download Terrarium Terrain Tiles

We'll download the terrain tiles for the same bounding box we used for Protomaps:

1. **Download Terrarium tiles**: Use the PMTiles CLI to extract terrain tiles:
   ```bash
   pmtiles extract https://registry.opendata.aws/terrain-tiles/terrarium-z12.pmtiles sources/terrarium-waiheke.pmtiles \
     --bbox=174.8,-37.0,175.2,-36.7
   ```

   **Note**: The source for these tiles is [AWS Open Data Registry](https://registry.opendata.aws/terrain-tiles/) and they're created by [Tilezen](https://github.com/tilezen/joerd). These terrain tiles are from approximately 2008 or before. There are other options for terrain, such as:
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
     {
     "version": 8,
     "sources": {
       ... },
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

2. **Add the hillshade layer** to your layers list. This should go after **before** the `landcover` layer so it appears underneath:
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

3. **Add contour lines** (optional):
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

### Test Your Map

1. **Refresh your browser**: Go to `http://127.0.0.1:1234/index.html`

2. **You should see**:
   - The Protomaps basemap
   - Terrain showing the topography
   - Contour lines (if added)
   - The Te Ara Hura trail displayed on top


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

