import { Component, Event, EventEmitter, Host, Listen, Prop, State, h } from '@stencil/core';

import { Loader, Switch } from '@fc';
import { Task, User } from '@utils/tj';

import { Notification } from '../notifications-provider/types';

/**
 * Main component that decides whether to show the task timesheet or the new task form.
 */
@Component({
  tag: 'tj-task-page',
  scoped: true,
})
export class TJTaskPage {
  /**
   * Emitted when a notification needs to be displayed. Requires the component to be inside a `notifications-provider`.
   */
  @Event() notification: EventEmitter<Notification>;

  /**
   * The Jira ID of the task.
   */
  @Prop({ attribute: 'jira-id' }) jiraID!: string;
  /**
   * The summary of the task.
   */
  @Prop() jiraSummary!: string;
  /**
   * The Jira description of the task.
   */
  @Prop() jiraDescription: string | undefined;

  @State() isLoading = true;
  @State() task: Task | null;
  @State() showEditForm = false;

  async componentWillLoad() {
    this.isLoading = false;
    try {
      if (!this.jiraID) {
        throw new Error('Jira ID is missing. Check your configuration.');
      }
      this.task = await User.findTaskForJiraID(this.jiraID);
    } catch (error) {
      this.notification.emit({
        type: 'error',
        message: error.message,
      });
    }
  }

  @Listen('taskCreated')
  taskCreatedHandler(event: CustomEvent<Task>) {
    this.task = event.detail;
  }

  @Listen('editTask')
  editTaskHandler() {
    this.showEditForm = true;
  }

  @Listen('cancelEditTask')
  cancelEditTaskHandler() {
    this.showEditForm = false;
  }

  render() {
    return (
      <Host>
        <Loader isLoading={this.isLoading}>
          <Switch
            shouldBreak
            cases={[
              {
                condition: this.task !== null && this.showEditForm,
                renderComponent: () => <tj-edit-task-form task={this.task} />,
              },
              {
                condition: this.task !== null && !this.showEditForm,
                renderComponent: () => <tj-task-timesheet task={this.task} />,
              },
              {
                condition: this.task === null,
                renderComponent: () => (
                  <tj-new-task-form
                    jiraID={this.jiraID}
                    jiraSummary={this.jiraSummary}
                    jiraDescription={this.jiraDescription}
                  />
                ),
              },
            ]}
          />
        </Loader>
      </Host>
    );
  }
}
