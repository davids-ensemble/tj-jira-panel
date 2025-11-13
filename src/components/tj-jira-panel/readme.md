# tj-jira-panel



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute          | Description                                         | Type                            | Default         |
| -------------------------- | ------------------ | --------------------------------------------------- | ------------------------------- | --------------- |
| `jiraDescription`          | `jira-description` | The Jira description of the task.                   | `string`                        | `undefined`     |
| `jiraID` _(required)_      | `jira-id`          | The Jira ID of the task to display.                 | `string`                        | `undefined`     |
| `jiraSummary` _(required)_ | `jira-summary`     | The Jira summary of the task to display.            | `string`                        | `undefined`     |
| `scriptVersion`            | `script-version`   | The version of the script used to inject the panel. | `string`                        | `undefined`     |
| `theme`                    | `theme`            |                                                     | `"jira-cloud" \| "jira-server"` | `'jira-server'` |


## Dependencies

### Depends on

- [notifications-provider](../notifications-provider)
- [tj-heading](./components/heading)
- [tj-login-form](../tj-login-form)
- [tj-task-page](../tj-task-page)
- [tj-settings](../tj-settings)
- [tj-footer](./components/footer)

### Graph
```mermaid
graph TD;
  tj-jira-panel --> notifications-provider
  tj-jira-panel --> tj-heading
  tj-jira-panel --> tj-login-form
  tj-jira-panel --> tj-task-page
  tj-jira-panel --> tj-settings
  tj-jira-panel --> tj-footer
  notifications-provider --> notification-toast
  tj-heading --> settings-button
  tj-task-page --> tj-edit-task-form
  tj-task-page --> tj-task-timesheet
  tj-task-page --> tj-new-task-form
  tj-edit-task-form --> tj-task-form
  tj-task-form --> contextual-help
  tj-new-task-form --> tj-task-form
  tj-settings --> tj-parent-tasks-page
  tj-settings --> tj-work-kind-page
  tj-footer --> settings-button
  tj-footer --> tj-update-banner
  tj-update-banner --> contextual-help
  style tj-jira-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
