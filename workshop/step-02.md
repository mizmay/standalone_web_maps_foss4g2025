---
layout: base.njk
title: Step 2 - Use Overpass to Create an OpenStreetMap Extract
step: 2
prev: step-01.html
next: step-03.html
---

## Extract Te Ara Hura Data from OpenStreetMap

In this step, we'll use Overpass Turbo to extract the Te Ara Hura trail data from OpenStreetMap. The trail is stored as [relation 6170321](https://www.openstreetmap.org/relation/6170321#map=13/-36.79898/175.07092) in OpenStreetMap.

### About Te Ara Hura

**Te Ara Hura** (The Wandering Path) is a collection of walks to explore Waiheke Island and discover its natural beauty. The trail network includes coastline walks, native bush paths, and visits to historic sites. Learn more on the [Auckland Council website](https://www.aucklandcouncil.govt.nz/parks-recreation/get-outdoors/find-a-walk/Pages/te-ara-hura-walk-waiheke-network.aspx).

### Export the Trail Relation from OpenStreetMap

1. **Go to Overpass Turbo**: Visit [https://overpass-turbo.eu/](https://overpass-turbo.eu/)

2. **Paste this query** into the query window:

```overpass
/* Te Ara Hura Trail - Waiheke Island */
[out:json][timeout:25];

// Store the relation
rel(6170321)->.rel;

// Get member ways and their nodes
(
  way(r.rel);
  node(w); // nodes of the ways
)->.ways_and_nodes;

// Get member nodes that are *direct* members of the relation
node(r.rel)->.standalone_nodes;

// Combine all
(
  .ways_and_nodes;
  .standalone_nodes;
);
out body;
```

3. **Run the query**: Click the "Run" button (or press Ctrl+Enter)

4. **Wait for results**: The query will execute and display the trail data on the map

5. **Verify the data**: You should see the Te Ara Hura trail network displayed on Waiheke Island

### Download as GeoJSON

1. **Download the data**: Click the "Export" button
   
2. **Select format**: Choose "GeoJSON" from the format dropdown

3. **Download the file**: Click "Download" and save the file as `te_ara_hura.geojson`

### Save to Your Repository

1. **Copy the file to your repository**:

  In the process of downloading you can create a new `sources` directory inside your local repository, or you can do that now.

  Manually, via VS Code or your local file system:
   - Create a new folder called `sources/` in your local repository
   - Move the downloaded `te_ara_hura.geojson` file there

  From the terminal:

   ```bash
   # Make sure you're in your repository directory
   mkdir sources
   cp ~/Downloads/te_ara_hura.geojson sources/te_ara_hura.geojson
   ```

2. **Verify the file**:
   ```bash
   ls -lh sources/te_ara_hura.geojson
   ```

   You should see the file listed with its size (464 KB).

### Commit and Upload to GitHub

Now let's save your progress to GitHub:

1. **Commit the file**:
   
   Using VS Code:
   - Open the Source Control panel (icon on the left sidebar, or `Ctrl+Shift+G`)
   - You should see `sources/te_ara_hura.geojson` listed as a new file
   - Click the "+" icon next to it to stage the file
   - Enter a commit message: "Add Te Ara Hura trail GeoJSON"
   - Click the checkmark to commit
   - Click the "Sync Changes" button (or "Push") to upload to GitHub

   Using the command line:
   ```bash
   git add sources/te_ara_hura.geojson
   git commit -m "Add Te Ara Hura trail GeoJSON"
   git push origin main
   ```

2. **View your GeoJSON on GitHub**:
   - Go to your repository on GitHub (https://github.com/YOUR-USERNAME/standalone_web_maps_foss4g2025)
   - Navigate to `sources/te_ara_hura.geojson`
   - Click on the file to view it
   - GitHub will automatically render the GeoJSON as an interactive map showing the trail network
   - Switch from "Preview" to "Code" to see the structure of the data directly

### Understanding the Data

The GeoJSON file contains:
- **Trail geometry**: The paths that make up the Te Ara Hura network
- **Trail segments**: Individual way segments that connect to form the complete trail
- **Properties**: Metadata about the trail (name, network, operator, etc.)

### What You Have Now

At the end of this step, you should have:
- `sources/te_ara_hura.geojson` - The trail data is stored in the cloud and ready to display on your map

This GeoJSON file will be loaded and displayed on your map in the next steps.

---

**[← Previous: Step 1](../step-01/) | [Next: Step 3 - Use Maplibre to Render Your Map →](../step-03/)**

