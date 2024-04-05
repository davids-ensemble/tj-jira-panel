# tj-jira-panel



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute      | Description                              | Type     | Default     |
| -------------------------- | -------------- | ---------------------------------------- | -------- | ----------- |
| `jiraID` _(required)_      | `jira-id`      | The Jira ID of the task to display.      | `string` | `undefined` |
| `jiraSummary` _(required)_ | `jira-summary` | The Jira summary of the task to display. | `string` | `undefined` |


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
  tj-task-page --> tj-task-timesheet
  tj-task-page --> tj-new-task-form
  tj-settings --> tj-parent-tasks-page
  style tj-jira-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
