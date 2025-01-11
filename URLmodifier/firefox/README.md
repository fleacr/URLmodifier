# my-firefox-extension/my-firefox-extension/README.md

# My Firefox Extension

This is a simple Firefox extension that appends "details/experience" to the current URL and navigates to the new URL when the user presses Ctrl + Alt.

## Installation

1. Clone the repository or download the source code.
2. Open Firefox and navigate to `about:debugging`.
3. Click on "This Firefox" in the sidebar.
4. Click on "Load Temporary Add-on".
5. Select the `manifest.json` file from the `src` directory of the extension.

## Usage

- Once the extension is installed, navigate to any webpage.
- Press `Ctrl + Alt` to append "details/experience" to the current URL and navigate to the new URL.

## Files

- **src/background.js**: Background script that listens for keyboard shortcuts.
- **src/content.js**: Script that modifies the current URL.
- **src/manifest.json**: Configuration file for the extension.