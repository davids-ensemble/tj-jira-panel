# tj-footer



<!-- Auto Generated Below -->


## Overview

The footer of the panel.
Displays the version of the server and the extension and provides a button to open/close the settings.

## Properties

| Property        | Attribute        | Description                                                                          | Type      | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------ | --------- | ----------- |
| `isJiraCloud`   | `is-jira-cloud`  | Whether the panel is using jira-cloud theme or not.                                  | `boolean` | `undefined` |
| `isLoggedIn`    | `is-logged-in`   | Whether the user is logged in. Certain information is only available when logged in. | `boolean` | `undefined` |
| `scriptVersion` | `script-version` | The version of the script used to inject the panel.                                  | `string`  | `undefined` |


## Dependencies

### Used by

 - [tj-jira-panel](../..)

### Depends on

- [settings-button](../settings-button)
- [tj-update-banner](../update-banner)

### Graph
```mermaid
graph TD;
  tj-footer --> settings-button
  tj-footer --> tj-update-banner
  tj-update-banner --> contextual-help
  tj-jira-panel --> tj-footer
  style tj-footer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
