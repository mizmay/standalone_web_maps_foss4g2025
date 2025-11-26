---
layout: base.njk
title: Step 3 - Use Maplibre to Render Your Map
step: 3
prev: step-02.html
next: step-04.html
mapImage: step-03.png
mapNote: "This is what your map should look like when you view it locally or in Codespaces"
---

In this step, we'll create the HTML structure and stylesheet, then set up a web server to use MapLibre GL JS to display the Te Ara Hura on a map.

## Understand Your Web Map Files

First, let's review the files needed for your map. We'll set up the web server afterward so you can view a version of Te Ara Hura rendered via Maplibre.

The two files to understand are `index.html`, which contains the code that invokes Maplibre, and `style.json`, which tells Maplibre how to render your source data.

### The Stylesheet

We need to tell Maplibre how we want the GeoJSON we downloaded in the previous step to be interpreted in order for Te Ara Hura to render on a web map.

Open the file called `style.json` in the root of your repository:

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

This is a MapLibre stylesheet, a JSON file that defines what data to display (`sources`) and how to render it (`layers`). Sources provide the map data (in this case a GeoJSON containing the trail data), while layers define visual styling (colors, line widths, opacity, etc.). 

See the [full MapLibre style specification](https://maplibre.org/maplibre-style-spec/) for all the variations and possible parameters that can be defined.

### Create a Web Map Using GL JS

Create a file called `index.html` by copying and pasting the text below into a new text file and saving this at the root of your repository:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Te Ara Hura Trail Map</title>
  
  <!-- Local copies of MapLibre GL JS -->
  <script src="lib/maplibre-gl.5.10.0.js"></script>
  <link href="lib/maplibre-gl.5.10.0.css" rel="stylesheet" />
  
  <style>
    /* Required CSS statements defining the map to be the full size of the viewport*/
    #map {
      width: 100vw;
      height: 100vh;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  
  <script>
    // Javascript to create a new map using Maplibre GL JS
    const map = new maplibregl.Map({
      container: 'map',
      style: 'style.json',
      center: [175.0709, -36.7990], // Waiheke Island coordinates
      zoom: 12
    });
  </script>
</body>
</html>
```

This HTML file brings together all of the assets and instructions Maplibre needs in order to render a map:
1. **It gives the map a title**, In this case "Te Ara Hura Trail Map", though you can change this to anything you like.

2. **It tells the web browser where to look** for the Maplibre rendering library, in this case it's at the nearby file path `lib/maplibre-gl.5.10.0.js`. Note that it is typical to use the version from a Content Delivery Network (CDN) such as **UNPKG**, **cdnjs** or **jsDelivr** rather than storing a copy of the library alongside your project, but this way you can easily open Maplibre as a text file and see the code you are running in the next steps.

3.  **It tells Maplibre how to render basic map elements in your browser** such as zoom controls, popups, and the attribution link. This information is stored and available for your review at `lib/maplibre-gl.5.10.0.css`.

4.  **It tells Maplibre to render a map** and to take up the whole browser window, or "viewport" doing it. Note both the style definitions uner `#map` and the code or script definitions where "map" is defined via `new maplibregl.Map({...})`. The style definition defines the dimensions of the map, and anything else about how it should be viewed. In the code definition you can see we are providing:
    - The location of the stylesheet `style.json` that we defined previously
    - A latitude and longitude for where in the world this map is centered, and
    - A zoom level, or map scale

## Setting up a Web Server

Now that you have your map files ready, let's set up a web server so you can view your map in a browser.

### Why Caddy?

We're using **Caddy** as our web server for this project because:

- **Simple configuration**: Caddy uses a straightforward `Caddyfile` configuration that's easy to understand and works identically across macOS, Linux, and Windows
- **No additional setup needed**: Unlike some web servers, Caddy doesn't require complex configuration files or extensive setup - it just works out of the box
- **Perfect for static files**: Caddy excels at serving static files (HTML, CSS, JavaScript, JSON, PMTiles) which is exactly what we need for this standalone web map
- **Cross-platform**: The same configuration works on all operating systems, making it easy for workshop participants regardless of their platform
- **Lightweight**: Caddy is a single binary with no dependencies, making it quick to install and run

While you could use other web servers (like Python's `http.server`, Node.js's `http-server`, or others), Caddy provides a consistent, simple experience that works the same way for everyone.

### Understand the Caddyfile

The repo you cloned contains a `Caddyfile`. This is a configuration file for Caddy, configured to serve your map files. 

**Examine the Caddyfile** in the root of your repository: you can open it as a text file and examine it if you are curious.

### Install and Run Caddy

You have two options for getting Caddy running:
1. **Install Caddy locally** (recommended if you can install software on your machine)
2. **Use GitHub Codespaces** (alternative if you cannot install Caddy locally)

Choose the option that works best for your setup.

### Option 1: Install Caddy Locally

Since we're working with static files, we need a local web server. We'll use Caddy, which is simple and works well for the file types we are working with.

For this step, you will need a terminal window, either inside VS Code (go to View > Terminal if you don't see it). or elsewhere if you are not using this code editor.

Copy and paste or type the commands below at the command prompt.

#### macOS Installation

```bash
brew install caddy
```

#### Linux Installation

```bash
sudo apt-get install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt-get update
sudo apt-get install caddy
```

#### Windows Installation

```bash
choco install caddy
```

### Option 2: Use GitHub Codespaces

If it isn't easy or feasible to install a web server on your local machine, you can use GitHub Codespaces, which provides a cloud-based development environment with all the tools you need.

**Note**: You should already have a forked repository from Step 1. If you haven't forked the repository yet, please go back to Step 1 and complete the fork first.

**Important**: Make sure you've committed and pushed all your changes (including `index.html` and `style.json` from above, and `sources/te_ara_hura.geojson` from Step 2) to GitHub before opening Codespaces. Codespaces will pull the latest version of your repository, so it needs to be up to date.

**Good news**: Caddy will be automatically installed when your Codespaces environment is created, so you can skip the installation step below.


### Commit Your Changes

First, let's save your work to your repository. 

**If you're using Codespaces**: Use the Source Control panel in Codespaces (or the terminal) to commit your changes. The process is the same as described below, but everything happens in your Codespaces environment.

**If you're working locally**: Switch to the Source Control tab on VS Code and commit the new files you created in the previous step with a meaningful commit message, just as you did in Step 2.

To commit using the command line (works in both local and Codespaces):

1. **Check your changes**:
   ```bash
   git status
   ```

   You should see:
   - `index.html` (new file)
   - `styles.json` (new file)

2. **Add your files**:
   ```bash
   git add .
   ```

3. **Commit your changes**:
   ```bash
   git commit -m "Add initial map of Te Ara Hura trail"
   ```

4. **Push to your fork**:
   ```bash
   git push origin main
   ```

#### Open in GitHub Codespaces

1. **Navigate to your forked repository** on GitHub (the one you created in Step 1)
2. **Click the green "Code" button** on your repository page
3. **Select the "Codespaces" tab**
4. **Click "Create codespace on main"** (or the branch you're working on)
5. **Wait for the Codespaces environment to start** (this may take a minute or two)

#### Caddy in Codespaces

Once your Codespaces environment is ready, Caddy will already be installed. The repository includes a devcontainer configuration that installs Caddy when the Codespace is created, so you can skip the installation step and go directly to starting the server.

### Start the Server

Once Caddy is installed (either locally or in Codespaces), open the Caddyfile to inspect it's contents. These are special configurations to help with the workflow in this workshop. You don't need to do anything special with this file. Caddy will use it automatically when it is running in the same directory.

Now you are ready to start the server:

1. **Open a New Terminal**: Terminal → New Terminal, or `` ` `` key if you do not already have a terminal window open. If you already have a terminal window, create an additional window using the `+` icon above. Navigate to the root directory.

2. **Start Caddy** if you are in the root directory, here start Caddy with the custom configurations stored in the `Caddyfile` in your project directory:
   
   ```bash
   caddy run
   ```

3. **View Your Map**:
   - **If working locally**: The server will be available at `http://127.0.0.1:1234/`. Copy and paste this address into your browser.
   - **If working in Codespaces**: GitHub Codespaces will automatically forward the port. Look for a notification or check the "Ports" tab in the bottom panel. You should see port 1234 forwarded with a URL like `https://xxxxx-1234.preview.app.github.dev/`. Click on the forwarded URL or copy it to your browser.
  **You should see**:
   - An empty white map canvas centered on Waiheke Island
   - The Te Ara Hura trail displayed as a red dashed line
 
1. **Keep the terminal window open** - the server needs to keep running. To stop the server, press `Ctrl+C` in the terminal where Caddy is running.

#### Continue with the Workshop

**Important for Codespaces users**: Since you're working in Codespaces, you should do ALL your work there:
- **Edit files** in the Codespaces editor (VS Code is built into Codespaces)
- **Commit changes** using the terminal or Source Control panel in Codespaces
- **Run the server** in the Codespaces terminal (as you just did)

From this point forward, when you see instructions to:
- Create or edit files → do this in Codespaces
- Commit changes → do this in Codespaces (using `git` commands in the terminal or the Source Control panel)
- View your map → use your Codespaces forwarded URL (e.g., `https://xxxxx-1234.preview.app.github.dev/`) instead of `http://127.0.0.1:1234/`

### What You Have Now

At the end of this step, you should have:
- Server running (either locally at `http://127.0.0.1:1234/` or in Codespaces with a forwarded URL)
- A working map displaying the Te Ara Hura trail as a red dashed line

At this stage, your map is only available locally (on your machine or in Codespaces). In the next step, we will enable GitHub Pages, where it will be viewable on the Web.

---

**[← Previous: Step 2](../step-02/) | [Next: Step 4 - Initialize GitHub Pages →](../step-04/)**

