---
layout: base.njk
title: Step 3 - Use Maplibre to Render Your Map
step: 3
prev: step-02.html
next: step-04.html
mapImage: step-03.png
mapNote: "This is what your map should look like when you view it locally at http://localhost:1234/"
---
In this step, we'll set up a local web server, create the HTML structure, and use MapLibre GL JS to display the Te Ara Hura trail on a map.

## Setting up a Local Server

### Install Caddy

Since we're working with static files, we need a local web server. We'll use Caddy, which is simple and works well for web maps.

For this step, you will need a terminal window, either inside VS Code or elsewhere if you are not using this code editor. In VS Code, go to Terminal > New Terminal

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

Download from [https://caddyserver.com/download](https://caddyserver.com/download) or use Chocolatey:

```bash
choco install caddy
```

#### Verify Installation

```bash
caddy version
```

### Start the Local Server

1. **Navigate to your repository**:
   ```bash
   cd /path/to/your/repository
   ```

2. **Start Caddy** using the Makefile:
   ```bash
   make serve
   ```

   This will start a server at `http://localhost:1234/`

3. **Keep the terminal window open** - the server needs to keep running

## Use Maplibre to Create a Web Map

Now that you are running a web server on your local machine and have some data, all you need to render Te Ara Hura in a web map are the style parameters (also known as a stylesheet), which you will define in a file called `style.json`, then we will walk through how to set up Maplibre to run in an HTML page, `index.html`.

### Create a Stylesheet

Create a file called `style.json` by copying and pasting the text below into a new text file and saving it at the root of your repository:

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

The MapLibre style specification is a JSON file that defines what data to display (`sources`) and how to render it (`layers`). Sources provide the map data (in this case a GeoJSON containing the trail data), while layers define visual styling (colors, line widths, opacity, etc.). See the [full MapLibre style specification](https://maplibre.org/maplibre-style-spec/) for more details.

### Create a Web Map Using GL JS:

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

### View Your Map

1. **Open your browser** and navigate to: `http://localhost:1234/index.html`

2. **You should see**:
   - An empty white map canvas centered on Waiheke Island
   - The Te Ara Hura trail displayed as a red dashed line

### What You Have Now

At the end of this step, you should have:
- `index.html` - HTML file that loads MapLibre and references your stylesheet
- `style.json` - Stylesheet defining your map sources and layers
- Local server running at `http://localhost:1234/`
- A working map displaying the Te Ara Hura trail as a red dashed line

At this stage, your map is only available on your local machine. In the next step, we will push your changes to Github Pages, where it will be viewable on the Web.

---

**[← Previous: Step 2](../step-02/) | [Next: Step 4 - Initialize GitHub Pages →](../step-04/)**

