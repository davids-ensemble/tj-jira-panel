# tj-new-task-form



<!-- Auto Generated Below -->


## Overview

A form that allows the user to create a new task for the given Jira issue.

## Properties

| Property                   | Attribute      | Description              | Type     | Default     |
| -------------------------- | -------------- | ------------------------ | -------- | ----------- |
| `jiraID` _(required)_      | `jira-id`      | The Jira ID of the task. | `string` | `undefined` |
| `jiraSummary` _(required)_ | `jira-summary` | The summary of the task. | `string` | `undefined` |


## Events

| Event          | Description                                                                                                        | Type                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `notification` | Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`. | `CustomEvent<Notification>` |
| `taskCreated`  | Emitted when a new task was created.                                                                               | `CustomEvent<Task>`         |


## Dependencies

### Used by

 - [tj-task-page](../..)

### Depends on

- [contextual-help](../../../contextual-help)

### Graph
```mermaid
graph TD;
  tj-new-task-form --> contextual-help
  tj-task-page --> tj-new-task-form
  style tj-new-task-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
