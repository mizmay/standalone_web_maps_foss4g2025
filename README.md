# Workshop Instruction Pages

This branch contains the workshop instruction materials for the **Standalone Web Maps Workshop: Te Ara Hura Trail**.

## Branch Structure

This is the `workshop-instructions` branch. The instruction pages are built using [Eleventy](https://www.11ty.dev/) and published via GitHub Pages.

**Note**: This branch is for maintaining workshop instruction materials only. Attendees should fork the `main` branch, which contains the starter files they need.

## Directory Structure

```
workshop-instructions/
├── README.md                  # This file
├── .eleventy.js               # Eleventy build configuration
├── package.json               # Build dependencies
└── workshop/                  # Instruction pages source
    ├── _includes/             # Templates
    │   ├── base.njk           # Base layout template
    │   └── map-embed.njk      # Map embed component
    ├── _data/                  # Global data
    │   └── workshop.json       # Workshop metadata
    ├── welcome.md              # Workshop welcome page
    ├── step-01.md              # Step 1 instructions
    ├── step-02.md              # Step 2 instructions
    ├── ...
    └── workshop.css            # Styles for instruction pages
```

## Building the Workshop Site

### Prerequisites

- Node.js (v18 or later)
- npm

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the site**:
   ```bash
   npm run build
   ```
   This will generate HTML files in the `workshop/` directory using relative paths.

3. **Serve locally for testing**:
   Serve from the repository root to match GitHub Pages structure:
   ```bash
   # Using Python
   python3 -m http.server 8000
   # Then visit: http://localhost:8000/workshop/welcome/
   
   # Or using Caddy (if installed)
   caddy file-server --listen 127.0.0.1:8000
   # Then visit: http://localhost:8000/workshop/welcome/
   ```
   
   **Note**: The Eleventy dev server (`npm run serve`) serves from the `workshop/` directory, so relative paths won't work correctly. Use a file server from the repo root instead.

### Building Locally

The build process:
1. Reads Markdown files from `workshop/` directory
2. Processes them through Eleventy templates
3. Outputs HTML files to `workshop/` directory (same location)
4. Passes through CSS and images/ directory for instruction pages

### Deployment

The workshop site is published via GitHub Pages.

## Editing Instructions

### Adding a New Step

1. **Create a new Markdown file** in `workshop/`:
   ```bash
   touch workshop/step-XX.md
   ```

2. **Add front matter** at the top:
   ```markdown
   ---
   layout: base.njk
   title: Step XX - Your Title
   step: XX
   prev: step-XX.html
   next: step-XX.html
   showMapPreview: true
   ---
   ```

3. **Write your content** in Markdown below the front matter

4. **Update `workshop/_data/workshop.json`** to include the new step

5. **Build and commit**:
   ```bash
   npm run build  # Build for GitHub Pages
   git add workshop/step-XX.html workshop/_data/workshop.json
   git commit -m "Add step XX"
   git push origin workshop-instructions
   ```

### Editing Existing Steps

1. **Edit the Markdown file** (e.g., `workshop/step-01.md`)

2. **Build**:
   ```bash
   npm run build
   ```

3. **Commit changes**:
   ```bash
   git add workshop/step-01.md workshop/step-01.html
   git commit -m "Update step 1"
   git push origin workshop-instructions
   ```

### Updating the Base Template

Edit `workshop/_includes/base.njk` to change:
- Navigation structure
- Header/footer
- Overall page layout

Then rebuild and commit.

### Updating Workshop Metadata

Edit `workshop/_data/workshop.json` to:
- Update step list
- Modify workshop title/subtitle
- Change instructor information
- Update total step count

## File Types

### Markdown Files (`.md`)

- Written in Markdown with front matter (YAML)
- Processed by Eleventy into HTML
- Use `.md` extension
- Located in `workshop/` directory

### Template Files (`.njk`)

- Nunjucks templates in `workshop/_includes/`
- Used for consistent layout across pages
- Can include other templates using `{% include %}`

### Data Files (`.json`)

- Global data in `workshop/_data/`
- Automatically available in templates as `workshop.*`
- Use for step lists, metadata, etc.

## Workflow

### Local Development & Testing

1. **Make changes** to Markdown files or templates
2. **Build the site**: `npm run build`
   - Uses relative paths for all links (CSS, navigation, content)
   - Works identically for both local testing and GitHub Pages
3. **Test locally** by serving from repository root:
   ```bash
   python3 -m http.server 8000
   # Then visit: http://localhost:8000/workshop/welcome/
   ```
   Or use Caddy:
   ```bash
   caddy file-server --listen 127.0.0.1:8000
   # Then visit: http://localhost:8000/workshop/welcome/
   ```
4. **Verify links and styles work correctly**

### Deploying to GitHub Pages

1. **Build the site**: `npm run build`
   - Uses relative paths (works for both local and GitHub Pages)
2. **Commit built HTML files**: `git add workshop/**/*.html`
3. **Push to GitHub**: `git push origin workshop-instructions`
4. **GitHub Pages automatically updates** (serves from root at `/workshop/`)

### Important Notes

- **Single build command** - no separate local vs GitHub Pages builds needed
- **Always test locally** by serving from repository root (not from `workshop/` directory)
- **Relative paths everywhere** - CSS, navigation, and content links use relative paths that work in both environments

## GitHub Pages Configuration

The workshop site is configured to serve from this branch:
- **Settings → Pages → Source**: `workshop-instructions` branch
- **Folder**: `/ (root)`

This means the built HTML files in `workshop/` are served at:
`https://[username].github.io/[repo-name]/workshop/`


### Installing Dependencies

When you clone or pull changes:
```bash
npm install
```

This will:
- Read `package.json` and `package-lock.json`
- Install all dependencies into `node_modules/` (not committed)
- Ensure consistent versions across all environments

## Troubleshooting

**Build fails?**
- Check that all dependencies are installed: `npm install`
- Verify Markdown syntax is correct
- Check Eleventy error messages

**Seeing `index-o.html` files in your editor?**
- These are Eleventy build artifacts (duplicate permalink outputs)
- They're already in `.gitignore` and won't be committed
- Safe to ignore or delete them - they'll be regenerated on build
- They don't affect the published site

**Changes not showing?**
- Make sure you ran `npm run build`
- Verify HTML files were generated
- Check that you committed and pushed the built files

**Map doesn't embed?**
- The map preview iframe points to `../../index.html` (relative to instruction pages)
- Attendees must create `index.html` in the repository root (on `main` branch)
- Check file paths in templates are correct

## Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Nunjucks Template Engine](https://mozilla.github.io/nunjucks/)
- [MapLibre GL JS Documentation](https://maplibre.org/maplibre-gl-js-docs/)

---

**Note**: Remember to commit both source Markdown files AND the generated HTML files after building!
