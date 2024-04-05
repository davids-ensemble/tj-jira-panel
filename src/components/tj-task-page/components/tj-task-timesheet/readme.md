# tj-task-timesheet



<!-- Auto Generated Below -->


## Overview

A component that displays the timesheet for a given task allowing the user to record hours.

## Properties

| Property            | Attribute | Description                                  | Type   | Default     |
| ------------------- | --------- | -------------------------------------------- | ------ | ----------- |
| `task` _(required)_ | --        | The task for which to display the timesheet. | `Task` | `undefined` |


## Events

| Event          | Description                                                                                                        | Type                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `notification` | Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`. | `CustomEvent<Notification>` |


## Dependencies

### Used by

 - [tj-task-page](../..)

### Graph
```mermaid
graph TD;
  tj-task-page --> tj-task-timesheet
  style tj-task-timesheet fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
