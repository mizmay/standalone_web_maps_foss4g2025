---
layout: base.njk
title: Step 4 - Initialize GitHub Pages to Display Your Map
step: 4
prev: step-03.html
next: step-05.html
showMapPreview: false
---

In this step, you'll deploy your map so it's accessible on the web via GitHub Pages. Since you're working from your **forked version** of this repository, your map will be hosted on your own GitHub Pages site.

## Deploy to GitHub Pages

Go to your forked repo **on Github.com**.

### Add .nojekyll File (Recommended)

GitHub Pages uses Jekyll by default to process sites. For pure static files (HTML, CSS, JS), Jekyll processing isn't needed and can sometimes cause issues. Adding a `.nojekyll` file tells GitHub to skip Jekyll processing.

1. **Select "Add File" button** at the top (next to the **< > Code** button) on the Github.com page for your fork

2. **Select "+ Create New File"** from the drop-down

3. **Enter `.nojekyll` in the text box** where it says "Name your file..." (leave the file contents blank)

4. **Select "Commit changes..."**: default commit message is fine, as is "Commit directly to the main branch"

5. **Select "Commit changes" again**: you should now see the empty file called `.nojeckyll` in your repo

### Enable GitHub Pages

1. **Go to your repository on GitHub**: Navigate to the webpage for your fork on GitHub (if you aren't there already)

2. **Open Settings**: Click on the "Settings" tab at the top

3. **Go to Pages**: In the left sidebar, click "Pages"

4. **Configure Pages**:
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main`
   - **Folder**: Select `/ (root)`
   - Click "Save"

5. **Wait for deployment**: GitHub will take a minute or two to build and deploy your site

6. **Get your URL**: At the top of the page GitHub will display "Your site is live at" and your site URL, which will be:
   ```
   https://YOUR-USERNAME.github.io/standalone_web_maps_foss4g2025/
   ```

## Verify Your Deployment

1. **Visit your GitHub Pages URL**: Navigate to the URL GitHub provided

2. **Check your map**: You should see your the Te Ara Hura trail as in the previous step

3. **Check in different browsers**: Try opening in Chrome, Firefox<sup>*</sup>, and Safari

<sup>*</sup> *There is currently a [bug](https://github.com/protomaps/PMTiles/issues/584) in Firefox that prevents PMTiles from rendering correctly via Github Pages. There's a simple fix and we're hopeful it will get merged soon.*

### What You Have Now

At the end of this step, you should have:
- Your map files committed to your repository
- GitHub Pages enabled and configured
- A live URL where your map is accessible
- `.nojekyll` file (recommended) to ensure Jekyll doesn't interfere

Your map is now live on the web! 🎉

Now you are probably wondering how to add a basemap, or at the very least some reference layers. We'll tackle that next.

---

**[← Previous: Step 3](../step-03/) | [Next: Step 5 - Download Protomaps Reference Layers →](../step-05/)**

