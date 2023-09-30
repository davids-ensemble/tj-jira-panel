WebComponent for integrating Ensemble's TJ within Adobe's Jira

# Browser usage

You'll need to put two scripts inside your HTML file.

```html
<script type="importmap">
  {
    "imports": {
      "tslib": "https://unpkg.com/tslib?module",
      "lit": "https://unpkg.com/lit/index.js",
      "lit/": "https://unpkg.com/lit/",
      "@lit/reactive-element": "https://unpkg.com/@lit/reactive-element/reactive-element.js",
      "@lit/reactive-element/": "https://unpkg.com/@lit/reactive-element/",
      "lit-element": "https://unpkg.com/lit-element/index.js",
      "lit-element/": "https://unpkg.com/lit-element/",
      "lit-html": "https://unpkg.com/lit-html/lit-html.js",
      "lit-html/": "https://unpkg.com/lit-html/"
    }
  }
</script>
<script
  src="https://www.unpkg.com/@ens-davids/jira-tj-web-panel@1.0.2/dist/src/jira-tj-web-panel.js"
  type="module"
></script>
```

and use the element like this

```html
<jira-tj-web-panel
  jiraid="IDI-XXXX"
  jirasummary="The summary"
></jira-tj-web-panel>
```
