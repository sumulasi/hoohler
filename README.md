# Hooker

Basic gutenberg blocks for WordPress Gutenberg editor.
The purpose of this plugin is to show off how to manage gutenberg with a bundler like Webpack.

This plugin provides an automated way to test and to create blocks thanks to Webpack and Babel.
To add a new block, simply copy/paste an existing block folder under `\blocks`.
The block name also need to be changed in the `index.js` file in `registerBlockType()`.
That's it! All the rest will be built on `npm run dev`.

# Requirements

```
WordPress 4.9
Gutenberg 4.0
PHP 5.4
Node 8+
```

# Setup

Clone or download this repository in your plugins directory.
Then run the following scripts:

```
npm install
npm run dev
```

The way to internationalize Gutenberg may change in future.
