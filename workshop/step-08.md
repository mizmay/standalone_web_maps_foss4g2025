---
layout: base.njk
title: Step 8 - Add Interactivity
step: 8
prev: step-07.html
next: step-09.html
---

## Adding Interactivity to Your Map

In this final main step, we'll add interactive features to your map, such as popups when clicking on the trail, map controls, and hover effects.

### Add Map Controls

Let's add standard map controls (zoom, rotate, etc.):

1. **Update `index.html`** to add navigation control definition after the `map` is defined:
   ```javascript
    // Javascript to create a new map using Maplibre GL JS
    const map = new maplibregl.Map({
        ...
    });

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
   ```
### Add Popup on Click

Let's add a popup that shows information when you click on the trail:

1. **Create a popup element** and add click handler in `index.html`:
   ```javascript
   // Create popup
   const popup = new maplibregl.Popup({
     closeButton: true,
     closeOnClick: false
   });

     // Add click handler to trail
     map.on('click', 'te-ara-hura', function(e) {
       const coordinates = e.lngLat;
       const properties = e.features[0].properties;

       // Build popup content
       const popupContent = `
         <div class="popup-content">
           <h3>Te Ara Hura</h3>
           <p>The Wandering Path</p>
           <p>Explore Waiheke Island's beautiful trails</p>
           <a href="https://www.aucklandcouncil.govt.nz/parks-recreation/get-outdoors/find-a-walk/Pages/te-ara-hura-walk-waiheke-network.aspx" 
              target="_blank">Learn more</a>
         </div>
       `;

       popup
         .setLngLat(coordinates)
         .setHTML(popupContent)
         .addTo(map);
     });

     // Change cursor on hover
     map.on('mouseenter', 'te-ara-hura', function() {
       map.getCanvas().style.cursor = 'pointer';
     });

     map.on('mouseleave', 'te-ara-hura', function() {
       map.getCanvas().style.cursor = '';
     });
   });
   ```

### Add Hover Effects

Enhance the trail appearance on hover:

1. **Update the trail layer** in your `style.json` to include hover state:
   ```json
   {
     "id": "te-ara-hura-hover",
     "type": "line",
     "source": "te-ara-hura",
     "paint": {
       "line-color": "#ff0000",
       "line-width": 5,
       "line-opacity": 0.7,
       "line-dasharray": [2, 2]
     },
     "filter": ["==", "$type", "LineString"]
   }
   ```

2. **Add hover handler** in `index.js`:
   ```javascript
   // Update trail layer style on hover
   map.on('mouseenter', 'te-ara-hura', function() {
     map.setPaintProperty('te-ara-hura', 'line-width', 5);
   });

   map.on('mouseleave', 'te-ara-hura', function() {
     map.setPaintProperty('te-ara-hura', 'line-width', 3);
   });
   ```

### Style the Popup

Add styles for the popup in `styles.css`:

```css
.maplibregl-popup-content {
  padding: 15px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.popup-content h3 {
  margin: 0 0 10px 0;
  color: #e41f18;
}

.popup-content p {
  margin: 5px 0;
  color: #333;
}

.popup-content a {
  color: #667eea;
  text-decoration: none;
}

.popup-content a:hover {
  text-decoration: underline;
}
```

### Add Scale Control (Optional)

Add a scale indicator to show distances:

```javascript
// Add scale control
map.addControl(new maplibregl.ScaleControl({
  maxWidth: 100,
  unit: 'metric'
}), 'bottom-left');
```

### Test Your Interactive Map

1. **Refresh your browser**: Go to `http://127.0.0.1:1234/index.html`

2. **Test interactions**:
   - **Click on the trail**: Should show a popup with information
   - **Hover over the trail**: Should change color/thickness
   - **Use zoom controls**: Should zoom in/out
   - **Try fullscreen**: Should go fullscreen

### Troubleshooting

**Popup doesn't appear?**
- Check browser console (F12) for errors
- Verify the layer ID matches in the click handler
- Make sure the trail layer is clickable (check layer order)

**Hover doesn't work?**
- Verify mouseenter/mouseleave handlers are attached
- Check that layer ID matches

**Controls don't appear?**
- Check browser console for errors
- Verify MapLibre GL JS is loaded
- Check that controls are added after map creation

### What You Have Now

At the end of this step, you should have:
- Navigation controls (zoom, rotate, pitch)
- Popup on click showing trail information
- Hover effects on the trail
- Cursor changes on hover
- Optional: Scale control, fullscreen, geolocate

Your map is now fully interactive! 🎉

### Congratulations!

You've completed all 8 main steps! You now have:
- A working standalone web map
- Protomaps basemap integration
- Te Ara Hura trail displayed
- Terrain visualization
- Interactive features

If time permits, check out the **bonus steps** to customize your map further!

---

**[← Previous: Step 7](../step-07/)**

