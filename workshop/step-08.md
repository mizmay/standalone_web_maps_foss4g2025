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
2. **Add a scale bar** to show distances:

```javascript
// Add scale control
map.addControl(new maplibregl.ScaleControl({
  maxWidth: 100,
  unit: 'metric'
}), 'bottom-left');
```

### Add Hover Effects

Enhance the trail appearance on hover:

1. **Add a new style** in your `style.json` below the primary `te-ara-hura` style for the hover state:
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
   }
   ```

2. **Add hover handler** in `index.js`:
   ```javascript
   // Swap between trail layers on hover
   map.on('mouseenter', 'te-ara_hura', function() {
     map.setLayoutProperty('te-ara_hura', 'visibility', 'none');
     map.setLayoutProperty('te-ara-hura-hover', 'visibility', 'visible');
   });

   map.on('mouseleave', 'te-ara-hura-hover', function() {
     map.setLayoutProperty('te-ara_hura', 'visibility', 'visible');
     map.setLayoutProperty('te-ara-hura-hover', 'visibility', 'none');
   });

### Test Your Interactive Map

1. **Refresh your browser**: Go to `http://127.0.0.1:1234/index.html`

2. **Test interactions**:
   - **Click on the trail**: Should show a popup with information
   - **Hover over the trail**: Should change color/thickness
   - **Use zoom controls**: Should zoom in/out


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

