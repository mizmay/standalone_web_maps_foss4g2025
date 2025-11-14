---
layout: base.njk
title: Step 4 - Initialize GitHub Pages to Display Your Map
step: 4
prev: step-03.html
next: step-05.html
showMapPreview: false
---

## Deploy Your Map to GitHub Pages

In this step, you'll deploy your map so it's accessible on the web via GitHub Pages. Since you're working from your **forked version** of this repository, your map will be hosted on your own GitHub Pages site.

### Commit Your Changes

First, let's save your work to your repository. Switch to the Source Control tab on VS Code and commit the new files you created in the previous step with a meaningful commit message, just as you did in Step 2.

To open a new terminal window and commit manually:

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

### Add .nojekyll File (Recommended)

GitHub Pages uses Jekyll by default to process sites. For pure static files (HTML, CSS, JS), Jekyll processing isn't needed and can sometimes cause issues. Adding a `.nojekyll` file tells GitHub to skip Jekyll processing.

**Note**: Your site might work without this file, but it's a best practice to include it to ensure Jekyll doesn't interfere with your files.

Open a new terminal if you don't have one open already and paste the following lines, one at a time:

   ```bash
   touch .nojekyll
   git add .nojekyll
   git commit -m "Add .nojekyll to disable Jekyll processing"
   git push origin main
   ```

### Enable GitHub Pages

1. **Go to your repository on GitHub**: Navigate to the webpage for your fork on GitHub

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

### Verify Your Deployment

1. **Visit your GitHub Pages URL**: Navigate to the URL GitHub provided

2. **Check your map**: You should see your the Te Ara Hura trail as in the previous step

3. **Check in different browsers**: Try opening in Chrome, Firefox<sup>*</sup>, and Safari

<sup>*</sup> *There is currently a [bug](https://github.com/protomaps/PMTiles/issues/584) in Firefox that prevents PMTiles from rendering correctly via Github Pages. There's a simple fix and we're hopeful it will get merged.*

### Update Your Links

If you have any hard-coded paths or URLs in your files, make sure they work with your GitHub Pages URL. Since we're using relative paths (`lib/`, `sources/`), everything should work automatically.

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

