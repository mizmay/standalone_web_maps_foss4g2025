---
layout: base.njk
title: Step 1 - Get Set Up
step: 1
prev: null
next: step-02.html
---

## GitHub Account Setup

To participate in this workshop and deploy your map, you'll need a GitHub account.

### Create a GitHub Account

If you already have a Github account, please sign in. 

Otherwise, follow these steps:

1. **Go to GitHub**: Visit [https://github.com](https://github.com)

2. **Sign up**: Click "Sign up" and follow the prompts
   - Choose a username
   - Provide your email address
   - Create a secure password
   - Verify your email address

### Fork the Workshop Repository

Once you have a GitHub account and are signed in:

1. **Navigate to the workshop repository**: [mizmay/standalone_web_maps_foss4g2025](https://github.com/mizmay/standalone_web_maps_foss4g2025)

2. **Fork the repository**: 
   - Click the "Fork" button in the top right corner
   - Use the defaults to fork a copy to your account
   - Leave "Copy the `main` branch only" checked
   - You now have the starter files you need

## Set Up Your Local Computer

### Optional: Install VS Code

If you don't already have a code editor, a popular choice is Visual Studio Code (VS Code):

1. **Download VS Code**: Visit [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. **Install**: Follow the installation instructions for your operating system
3. **Verify**: Open VS Code to confirm it's installed correctly

**Note**: VS Code is built on open source but includes proprietary components (telemetry, branding). If you prefer a fully open source alternative, consider [VSCodium](https://vscodium.com/), which uses the same codebase without Microsoft's additions. The workshop instructions work with either version.

### Clone Your Fork Locally

After forking, you'll want to work with the code on your computer:

1. **Get your repository URL**: 
   - On your fork's page, click the green "Code" button
   - Copy the HTTPS URL (looks like `https://github.com/YOUR-USERNAME/standalone_web_maps_foss4g2025.git`)

2. **Clone the repository using VS Code**:
   - Open VS Code. There should be an Explorer button in the top left corner, when you tap this you can "Clone Repository". Or...
   - Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) to open the command palette, Type "Git: Clone" and select it
   - In either case, paste your repository URL
   - Choose a folder location to save the repository
   - VS Code will open the cloned repository automatically

   **Alternative (Command Line)**:
   This will work from any terminal or command line interface. You can then edit the contents from any text editor:
   ```bash
   git clone https://github.com/YOUR-USERNAME/standalone_web_maps_foss4g2025.git
   cd repository-name
   ```

## Verify Your Setup

You should now have:
- A GitHub account
- A code or text editor installed on your computer
- Your own fork of the workshop repository on Github
- A local copy on your computer

---

**[Next: Step 2 - Use Overpass to Create an OpenStreetMap Extract →](../step-02/)**
