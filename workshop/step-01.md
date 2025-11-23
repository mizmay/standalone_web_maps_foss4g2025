---
layout: base.njk
title: Step 1 - Get Set Up
step: 1
prev: null
next: step-02.html
---

To participate in this workshop and deploy your map, you'll need a GitHub account. You will use it to create your own copy, or fork, of the workshop repo, and learn how to work with it both on Github and on your local machine.

## On Github

### Log In

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

## On Your Local Computer

After forking, you'll want to work with the code on your computer. 

Scroll down to **Install Prerequisites** if you need to install either:
- VS Code
- Git

Once you have the prerequisites, follow the instructions below.

### Clone Your Fork Locally

1. **Get your repository URL**: 
   - On your fork's Github page, click the green "Code" button
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

### Install Prerequisites

#### VS Code

If you don't already have a code editor, a popular choice is Visual Studio Code (VS Code):

1. **Download VS Code**: Visit [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. **Install**: Follow the installation instructions for your operating system
3. **Verify**: Open VS Code to confirm it's installed correctly

**Note**: VS Code is built on open source but includes proprietary components (telemetry, branding). If you prefer a fully open source alternative, consider [VSCodium](https://vscodium.com/), which uses the same codebase without Microsoft's additions. The workshop instructions work with either version.

#### Git

If you have never used Git before, unless you are on Linux, you'll need to install it. 

**The easiest way is to follow VS Code's built-in prompts**: 
1. **Open VS Code** (if you haven't already)
2. **When you try to clone a repository** (in the previous section), VS Code will detect if Git is not installed and will prompt you to install it
   - Click "Download Git" or "Install Git" when prompted
   - Follow the installation wizard that appears
   - VS Code will guide you through the process
3. **After installation**, restart VS Code if prompted

Here are some additional instructions specific to your operating system:

**Additional options for installing Git on Mac:**

If following the prompts in VS Code is not an option, try these approaches:

*Option 1: Using Homebrew* (if you have Homebrew installed):
1. Open Terminal (Applications → Utilities → Terminal)
2. Run: `brew install git`
3. Verify installation: `git --version`

*Option 2: Download the official installer*:
1. Visit [https://git-scm.com/download/mac](https://git-scm.com/download/mac)
2. Download the installer (it will detect your Mac and provide the right version)
3. Run the installer and follow the prompts
4. After installation, you may need to restart Terminal or VS Code

**Additional options for installing Git on Windows:**

If you prefer to install Git manually before cloning, you can download it from [https://git-scm.com/download/win](https://git-scm.com/download/win) and follow the installation wizard.

#### Set Up Your Git Identity

**First time only** before you use Git, you need to set up your identity:
- Open a terminal in VS Code (Terminal → New Terminal, or `` ` `` key)
- Run these commands (replace with your name and email):
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```
- This information will be used for all your Git commits

## Verify Your Setup

You should now have:
- A GitHub account
- A code or text editor installed on your computer
- Your own fork of the workshop repository on Github
- A local copy on your computer

---

**[Next: Step 2 - Use Overpass to Create an OpenStreetMap Extract →](../step-02/)**
