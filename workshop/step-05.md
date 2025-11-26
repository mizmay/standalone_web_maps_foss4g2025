---
layout: base.njk
title: Step 5 - Download Reference Layers from Protomaps
step: 5
prev: step-04.html
next: step-06.html
---

In this step, we'll download a tile extract for Waiheke Island to use as our map's basemap (roads, labels, landcover, etc.).

## Downloading Protomaps

Protomaps provides global basemap tiles stored in PMTiles format and extractable by bounding box, so you can grab just what you need to provide some reference layers on your trail map. 

### Install PMTiles CLI

First, we need to install the PMTiles command-line tool to download and extract tiles.

**If you're using Codespaces**: PMTiles CLI is automatically installed when your Codespaces environment is created. You can skip the installation steps below and go directly to the "Verify Installation" section.

**If you're working locally**, follow the installation instructions for your operating system:

#### macOS Installation

```bash
brew install pmtiles
```

#### Linux Installation

Download from [https://github.com/protomaps/go-pmtiles/releases](https://github.com/protomaps/go-pmtiles/releases) or follow the [Protomaps Getting Started guide](https://docs.protomaps.com/guide/getting-started).

#### Windows Installation

1. **Download the Windows binary**:
   - Visit [https://github.com/protomaps/go-pmtiles/releases](https://github.com/protomaps/go-pmtiles/releases)
   - Download the latest `pmtiles-windows-amd64.exe` file
   
2. **Choose one of these options**:

   **Option A: Add to PATH (recommended for ongoing use)**
   - Create a folder for tools (e.g., `C:\tools`) if you don't have one
   - Move the downloaded `pmtiles-windows-amd64.exe` to that folder
   - Rename it to `pmtiles.exe`
   - Add the folder to your system PATH:
     - Press `Win + R`, type `sysdm.cpl`, press Enter
     - Go to "Advanced" tab → "Environment Variables"
     - Under "System variables", find "Path" and click "Edit"
     - Click "New" and add your tools folder path (e.g., `C:\tools`)
     - Click OK on all dialogs
   - Open a new terminal/command prompt and verify: `pmtiles version`

   **Option B: Use from download location (simpler for one-time use)**
   - Place the downloaded file in your repository root directory
   - Rename it to `pmtiles.exe`
   - Use it with the full path: `.\pmtiles.exe version` (or `pmtiles.exe version` from the repo root)

#### Verify Installation

```bash
pmtiles version
```

### Define the Bounding Box

For Waiheke Island, Auckland, New Zealand, we'll use this bounding box:

- **West (min longitude)**: 174.8
- **East (max longitude)**: 175.2
- **South (min latitude)**: -37.0
- **North (max latitude)**: -36.7

**Format**: We'll structure the bounding box as a list of `west, south, east, north` coordinates, and end up with `174.8, -37.0, 175.2, -36.7`

This bounding box includes:
- The entire Waiheke Island
- Some surrounding water for context
- A small buffer around the island

**Tip**: Need to find a bounding box for a different area? Use [bboxfinder.com](https://bboxfinder.com/) - draw a rectangle on the map and it will give you the bounding box coordinates in the format you need.

### Find the Latest Protomaps Build

1. **Check Protomaps builds**: Visit [https://maps.protomaps.com/builds/](https://maps.protomaps.com/builds/)
2. **Find the latest daily build**: Look for the most recent successful build in the "date" column (builds run nightly but it's the "tileset version" that matters for ensuring you've got the latest data)
3. **Note the filename**: It will look like `YYYYMMDD.pmtiles` (e.g., `20251110.pmtiles`)
4. **Click <u>xray</u>** in the same row
5. This allows you to inspect the tile layers in the basemap data. Zoom in on [Wiaheke Island](https://pmtiles.io/#url=https%3A%2F%2Fbuild.protomaps.com%2F20251110.pmtiles&map=10/-36.8483/175.0938) to see what's there. Toggle on and off `pois`. What features are these?

### Download the Protomaps Extract

Run this command (replace `20251110` with a more recent build if you like):

```bash
pmtiles extract https://build.protomaps.com/20251110.pmtiles sources/waiheke_island.pmtiles \
  --minzoom=10 \
  --maxzoom=16 \
  --bbox=174.8,-37.0,175.2,-36.7
```

**Parameters explained:**
- `--minzoom=10`: Minimum zoom level (this is the maximum extent of the map, beyond this, the island is too tiny)
- `--maxzoom=16`: Maximum zoom level (this is the maximum detail you can get from the data)
- `--bbox=174.8,-37.0,175.2,-36.7`: Bounding box for Waiheke Island

**Note**: This extract will typically be 50-200 MB, well under the 1 GB limit Github supports.

### Wait for Download

The download process can take a few minutes depending on:
- Your internet connection
- The size of the extract
- Server load

You'll see progress output showing the download status, and the number of tiles and total file size of your download.

### Commit Your Changes

Follow the process from Step 4 and Step 2 to add, commit, and push `waiheke_island.pmtiles` to your remote fork.

**Note for Codespaces users**: Commit these changes in your Codespaces environment using the terminal or Source Control panel.

### What You Have Now

At the end of this step, you should have:
- `sources/waiheke_island.pmtiles`: Protomaps basemap tiles for Waiheke Island, stored both locally on your hard drive and remotely via Github.

### Next Steps

In the next step, we'll configure the stylesheet to style the Protomaps tiles and integrate them into your map.

---

**[← Previous: Step 4](../step-04/) | [Next: Step 6 - Configure the Stylesheet →](../step-06/)**

